import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LinkForm } from "@/components/admin/link-form";

export default async function EditLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: link } = await supabase
    .from("links")
    .select("id, title, description, url, category, status, sort_order")
    .eq("id", id)
    .single();

  if (!link) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Link Edit Karein</h1>
      <LinkForm
        initialData={{
          id: link.id,
          title: link.title,
          description: link.description || "",
          url: link.url,
          category: link.category,
          status: link.status,
          sort_order: link.sort_order,
        }}
      />
    </div>
  );
}
