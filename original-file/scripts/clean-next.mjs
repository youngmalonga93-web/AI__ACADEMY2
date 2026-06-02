import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

await rm(resolve(root, ".next"), { recursive: true, force: true });

console.log("Removed .next build output.");
