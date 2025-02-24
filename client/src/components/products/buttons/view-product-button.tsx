"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface ViewProductButtonProps {
  productId: number;
}

export function ViewProductButton({ productId }: ViewProductButtonProps) {
  return (
    <Button asChild variant="outline" size="sm">
      <Link href={`/dashboard/products/${productId}`}>
        <Eye className="h-4 w-4 mr-1" />
        Voir
      </Link>
    </Button>
  );
}
