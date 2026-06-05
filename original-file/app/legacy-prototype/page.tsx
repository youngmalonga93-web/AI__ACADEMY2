import { notFound } from "next/navigation";

export default async function LegacyPrototypePage() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_LEGACY_PROTOTYPE !== "true"
  ) {
    notFound();
  }

  const LegacyPrototype = (await import("./LegacyPrototype.jsx")).default;

  return <LegacyPrototype />;
}
