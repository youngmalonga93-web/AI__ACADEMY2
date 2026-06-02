import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const serverDir = resolve(root, ".next", "server");
const errors = [];

function walk(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : entry.name.endsWith(".js") ? [fullPath] : [];
  });
}

for (const file of walk(serverDir)) {
  const source = readFileSync(file, "utf8");
  const requirePattern = /require\(\s*["'](\.\/[^"']+\.js)["']\s*\)/g;
  let match;

  while ((match = requirePattern.exec(source))) {
    const target = resolve(dirname(file), match[1]);
    if (!existsSync(target)) {
      errors.push(`${relative(root, file)} references missing chunk ${relative(root, target)}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Chunk verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Server chunk references verified.");
