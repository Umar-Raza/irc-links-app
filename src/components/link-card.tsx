"use client";

// import { ChevronRight } from "lucide-react";
import { getIconForCategory } from "@/lib/link-icons";
import { trackClickAndRedirect } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Globe, MessageCircle } from "lucide-react";

type LinkItem = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string;
  status: string;
};

export function LinkCard({ link }: { link: LinkItem }) {
  const Icon = link.category === "whatsapp" ? MessageCircle : Globe;

  const handleClick = () => {
    trackClickAndRedirect(link.id, link.url);
  };

  return (
    <button
      onClick={handleClick}
      className="link-card-hover w-full flex items-center gap-4 p-4 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md text-left"
    >
      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm truncate">{link.title}</h3>
          {link.status === "full" && (
            <Badge variant="secondary" className="text-xs shrink-0">
              Full
            </Badge>
          )}
        </div>
        {link.description && (
          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
            {link.description}
          </p>
        )}
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
    </button>
  );
}
