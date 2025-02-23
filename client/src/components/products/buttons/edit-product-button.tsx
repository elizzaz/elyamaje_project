'use client'

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import Link from 'next/link'

interface EditProductButtonProps {
  productId: number
}

export function EditProductButton({ productId }: EditProductButtonProps) {
  return (
    <Link href={`/dashboard/products/${productId}/edit`}>
      <Button variant="outline" size="sm">
        <Pencil className="h-4 w-4 mr-1" />
        Modifier
      </Button>
    </Link>
  )
}