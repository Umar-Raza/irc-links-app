import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shrink-0">
          R
        </div>
        <div>
          <h1 className="font-semibold text-base leading-tight">
            Faisalabad Research Institute
          </h1>
          <p className="text-sm text-muted-foreground leading-tight">
            Central Resources &amp; Updates Hub
          </p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}
