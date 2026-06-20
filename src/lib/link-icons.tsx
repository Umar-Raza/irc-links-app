import { Globe, MessageCircle, type LucideIcon } from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  website: Globe,
};

export function getIconForCategory(category: string): LucideIcon {
  return categoryIcons[category] || Globe;
}
