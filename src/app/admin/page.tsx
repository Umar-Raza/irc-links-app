import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LinksTable } from "@/components/admin/links-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("links")
    .select("id, title, category, status, url, click_count")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Links</h1>
          <p className="text-muted-foreground text-sm">
            Apne research center ke saare links yahan manage karein.
          </p>
        </div>
        <Button render={<Link href="/admin/links/new" />}>
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      <LinksTable links={links || []} />
    </div>
  );
}
