'use client'

import { Button } from "@/components/ui/button"
import { useDeleteProduct } from "@/hooks/useProducts"
import { ProductActionButtonProps } from "@/types/components"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteProductButton({ productId, productName }: ProductActionButtonProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct()

  const handleDelete = async () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
      deleteProduct(productId, {
        onSuccess: () => {
          toast.success('Produit supprimé avec succès')
        },
        onError: (error) => {
          toast.error(`Erreur: ${error.message}`)
        }
      })
    }
  }

  return (
    <Button 
      variant="destructive" 
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      {isPending ? 'Suppression...' : 'Supprimer'}
    </Button>
  )
} 