import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceDirs = ["app", "components", "data", "lib", "scripts", "tests"];
const sourceExtensions = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
];
const importPattern =
  /(?:import\s+(?:type\s+)?(?:[^'"()]*?\s+from\s+)?|export\s+(?:type\s+)?[^'"()]*?\s+from\s+|require\s*\(\s*|import\s*\(\s*)(["'])([^"']+)\1/g;

const errors = [];

function walk(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist", "coverage"].includes(entry.name)) {
        return [];
      }

      return walk(fullPath);
    }

    return sourceExtensions.includes(extname(entry.name)) ? [fullPath] : [];
  });
}

function hasExactCase(path) {
  const absolute = resolve(path);
  const parsed = absolute.split(/[\\/]+/);
  let current = parsed[0] === "" ? "/" : parsed[0];

  for (const segment of parsed.slice(1)) {
    if (!segment) {
      continue;
    }

    const entries = readdirSync(current || ".", { withFileTypes: true }).map(
      (entry) => entry.name
    );
    if (!entries.includes(segment)) {
      const match = entries.find(
        (entry) => entry.toLowerCase() === segment.toLowerCase()
      );
      return match ? false : existsSync(absolute);
    }

    current = join(current, segment);
  }

  return true;
}

function candidatesFor(specifier, importer) {
  const base = specifier.startsWith("@/")
    ? resolve(root, specifier.slice(2))
    : specifier.startsWith(".")
      ? resolve(dirname(importer), specifier)
      : null;

  if (!base) {
    return [];
  }

  if (extname(base)) {
    return [base];
  }

  return [
    ...sourceExtensions.map((extension) => `${base}${extension}`),
    ...sourceExtensions.map((extension) => join(base, `index${extension}`)),
  ];
}

for (const file of sourceDirs.flatMap((dir) => walk(resolve(root, dir)))) {
  const text = readdirSync(dirname(file)).includes(
    file.split(/[\\/]/).at(-1) ?? ""
  )
    ? await import("node:fs/promises").then((fs) => fs.readFile(file, "utf8"))
    : "";
  const relativeFile = relative(root, file);
  let match;

  while ((match = importPattern.exec(text))) {
    const fullMatch = match[0];
    const specifier = match[2];
    const isDynamicImport = fullMatch.trim().startsWith("import(");

    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
      continue;
    }

    if (isDynamicImport && specifier.startsWith(".") && !extname(specifier)) {
      errors.push(
        `${relativeFile}: dynamic import "${specifier}" must include a file extension`
      );
      continue;
    }

    const candidates = candidatesFor(specifier, file);
    const resolved = candidates.find(
      (candidate) => existsSync(candidate) && statSync(candidate).isFile()
    );

    if (!resolved) {
      errors.push(
        `${relativeFile}: import "${specifier}" does not resolve to a file`
      );
      continue;
    }

    if (!hasExactCase(resolved)) {
      errors.push(
        `${relativeFile}: import "${specifier}" casing does not match ${relative(root, resolved)}`
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Import validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Import paths validated.");
