"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function completeLessonAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");

  if (!slug) {
    throw new Error("Lesson slug is required.");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: lesson, error: lessonError } = await supabase.from("lessons").select("id").eq("slug", slug).single();

  if (lessonError || !lesson) {
    throw lessonError ?? new Error("Lesson not found.");
  }

  const { error: progressError } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lesson.id,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (progressError) {
    throw progressError;
  }

  revalidatePath(`/lessons/${slug}`);
  revalidatePath("/dashboard");
}
