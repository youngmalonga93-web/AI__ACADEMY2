import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const hooksPath = "original-file/.githooks";

if (existsSync(resolve(root, ".githooks"))) {
  execFileSync("git", ["config", "core.hooksPath", hooksPath], {
    cwd: root,
    stdio: "inherit",
  });
  console.log(`Git hooks path set to ${hooksPath}`);
}
