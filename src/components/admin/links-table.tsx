"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { deleteLink, toggleLinkStatus } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type LinkItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  url: string;
  click_count: number;
};

export function LinksTable({ links }: { links: LinkItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteLink(id);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    await toggleLinkStatus(id, currentStatus);
    router.refresh();
  };

  if (links.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Koi link nahi hai. Upar se &quot;Add Link&quot; pe click kar k naya link
        banayen.
      </p>
    );
  }

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status (Active)</TableHead>
            <TableHead className="text-center">Clicks</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link, index) => (
            <TableRow key={link.id}>
              <TableCell className="text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium max-w-[200px] truncate">
                {link.title}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {link.category}
                </Badge>
              </TableCell>
              <TableCell>
                {link.category === "whatsapp" ? (
                  <Switch
                    checked={link.status === "active"}
                    onCheckedChange={() =>
                      handleToggleStatus(link.id, link.status)
                    }
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell className="text-center">{link.click_count}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    render={
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    render={<Link href={`/admin/links/${link.id}/edit`} />}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      }
                    />
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Link delete karein?</AlertDialogTitle>
                        <AlertDialogDescription>
                          &quot;{link.title}&quot; permanently delete ho jayega.
                          Ye action wapas nahi ho sakta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(link.id)}
                          disabled={deletingId === link.id}
                        >
                          {deletingId === link.id ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
