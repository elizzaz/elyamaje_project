'use client'

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from 'next/link'

interface ViewProductButtonProps {
  productId: number
}

export function ViewProductButton({ productId }: ViewProductButtonProps) {
  return (
    <Link href={`/dashboard/products/${productId}`}>
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4 mr-1" />
        Voir
      </Button>
    </Link>
  )
}