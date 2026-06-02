import { describe, expect, it } from "vitest";
import { calculateProgressPercent } from "../lib/progress";

describe("progress calculations", () => {
  it("calculates rounded completion percentages", () => {
    expect(calculateProgressPercent(1, 4)).toBe(25);
    expect(calculateProgressPercent(2, 3)).toBe(67);
  });

  it("handles empty lesson sets", () => {
    expect(calculateProgressPercent(0, 0)).toBe(0);
  });
});
