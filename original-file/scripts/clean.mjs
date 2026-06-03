import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const targets = [
  ".next",
  "node_modules",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
];

for (const target of targets) {
  await rm(resolve(root, target), { recursive: true, force: true });
}

console.log("Removed build output, dependencies, and lockfiles.");
