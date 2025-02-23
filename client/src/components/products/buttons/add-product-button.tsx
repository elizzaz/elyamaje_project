'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from 'next/link'

export function AddProductButton() {
  return (
    <Link href="/dashboard/products/new">
      <Button>
        <Plus className="h-4 w-4 mr-1" />
        Ajouter un produit
      </Button>
    </Link>
  )
}