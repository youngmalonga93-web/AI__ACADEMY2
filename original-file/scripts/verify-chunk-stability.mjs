import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestFiles = [
  ".next/build-manifest.json",
  ".next/app-build-manifest.json",
];
const outputPath = resolve(root, ".next", "chunk-stability-report.json");
const warnings = [];

function normalizeChunkName(value) {
  return basename(value).replace(/[a-f0-9]{16,}/gi, "[hash]");
}

function collectChunks(value, chunks = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectChunks(item, chunks);
    }
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectChunks(item, chunks);
    }
  } else if (typeof value === "string" && value.endsWith(".js")) {
    chunks.add(normalizeChunkName(value));
  }

  return chunks;
}

const normalizedChunks = [];

for (const manifestFile of manifestFiles) {
  const manifestPath = resolve(root, manifestFile);

  if (!existsSync(manifestPath)) {
    warnings.push(
      `${manifestFile} was not found. Run next build before checking chunk stability.`
    );
    continue;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  normalizedChunks.push(...collectChunks(manifest));
}

const numericChunks = normalizedChunks.filter((chunk) =>
  /^(\d+|\[hash\])\.js$/.test(chunk)
);

if (numericChunks.length > 0) {
  warnings.push(
    `Found numeric chunk names after normalization: ${[...new Set(numericChunks)].join(", ")}`
  );
}

const report = {
  checkedAt: new Date().toISOString(),
  normalizedChunkCount: new Set(normalizedChunks).size,
  warnings,
};

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);

if (warnings.length > 0) {
  console.warn("Chunk stability warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
} else {
  console.log("Chunk stability check passed.");
}
