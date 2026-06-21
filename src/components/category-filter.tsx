"use client";

import { Button } from "@/components/ui/button";

const categories = [
  { value: "all", label: "All" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Websites" },
  { value: "feedback", label: "Feedback" },
];

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={active === cat.value ? "default" : "outline"}
          size="default"
          className="filter-tab rounded-full"
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
