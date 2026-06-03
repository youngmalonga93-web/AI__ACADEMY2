import { Badge } from "@/components/ui/badge";
import { getCourseModules } from "@/lib/content/repository";
import { phases } from "@/data/content";
import { CourseCatalog } from "./CourseCatalog";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const modules = await getCourseModules();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>AI expert track</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Course Catalog
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            A practical path from AI literacy to production systems, operator
            judgment, applied automation, model evaluation, and infrastructure
            fluency.
          </p>
        </div>
      </div>

      <CourseCatalog modules={modules} phases={phases} />
    </div>
  );
}
