"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function trackClickAndRedirect(linkId: string, url: string) {
  const supabase = await createClient();
  const headersList = await headers();

  await supabase.from("clicks").insert({
    link_id: linkId,
    referrer: headersList.get("referer") || null,
    user_agent: headersList.get("user-agent") || null,
  });

  redirect(url);
}

export async function trackPageVisit() {
  const supabase = await createClient();
  const headersList = await headers();

  await supabase.from("page_visits").insert({
    referrer: headersList.get("referer") || null,
    user_agent: headersList.get("user-agent") || null,
  });
}

export async function deleteLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function toggleLinkStatus(id: string, currentStatus: string) {
  const supabase = await createClient();
  const newStatus = currentStatus === "active" ? "full" : "active";
  const { error } = await supabase
    .from("links")
    .update({ status: newStatus })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
