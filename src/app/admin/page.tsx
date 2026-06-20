import { LogoutButton } from "@/components/logout-button";

export default function AdminPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="text-muted-foreground">
        Yahan Links management aur Analytics aayega.
      </p>
    </div>
  );
}
