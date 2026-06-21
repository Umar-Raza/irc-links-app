"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { CategoryFilter } from "@/components/category-filter";
import { SearchBar } from "@/components/search-bar";
import { LinkCard } from "@/components/link-card";
import { Skeleton } from "@/components/ui/skeleton";

type LinkItem = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string;
  status: string;
};

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLinks() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .select("id, title, description, url, category, status")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setLinks(data);
      }
      setLoading(false);
    }

    async function recordVisit() {
      const supabase = createClient();
      await supabase.from("page_visits").insert({
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    }

    fetchLinks();
    recordVisit();
  }, []);

  const filteredLinks = links
    .filter((l) => (filter === "all" ? true : l.category === filter))
    .filter((l) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        (l.description?.toLowerCase().includes(q) ?? false)
      );
    });

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <SiteHeader />

        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mb-6">
          <CategoryFilter active={filter} onChange={setFilter} />
        </div>

        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[72px] w-full rounded-xl" />
            ))
          ) : filteredLinks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Koi link nahi mila.
            </p>
          ) : (
            filteredLinks.map((link, index) => (
              <div
                key={link.id}
                className="fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <LinkCard link={link} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
