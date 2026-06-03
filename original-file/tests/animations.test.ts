import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { modules } from "../data/content";
import {
  getModuleAnimation,
  moduleAnimationCount,
} from "../lib/module-animations";

describe("module animations", () => {
  it("maps every module to a committed public SVG", () => {
    expect(moduleAnimationCount).toBe(modules.length);

    for (const module of modules) {
      const animation = getModuleAnimation(module.id, module.title);
      const filePath = path.join(
        process.cwd(),
        "public",
        animation.src.slice(1)
      );

      expect(animation.src).toMatch(/^\/animations\/.+\.svg$/);
      expect(existsSync(filePath)).toBe(true);
    }
  });
});
