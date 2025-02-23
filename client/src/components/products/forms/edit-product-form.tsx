'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useProduct, useUpdateProduct } from '@/hooks/useProducts'
import { toast } from 'sonner'
import { UpdateProductInput } from '@/types/product'

interface EditProductFormProps {
  productId: number
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter()
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId)
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()

  if (isLoadingProduct) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
      </Card>
    )
  }

  if (!product) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Produit non trouvé</div>
      </Card>
    )
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const productData: UpdateProductInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
    }

    updateProduct(
      { id: productId, ...productData },
      {
        onSuccess: () => {
          toast.success('Produit modifié avec succès')
          router.push('/dashboard')
          router.refresh()
        },
        onError: (error) => {
          toast.error(`Erreur: ${error.message}`)
        }
      }
    )
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={product.name}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            name="description" 
            defaultValue={product.description || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Prix</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            min="0" 
            defaultValue={product.price}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            min="0" 
            defaultValue={product.stock}
            required 
          />
        </div>
        <Button type="submit" className="w-full" disabled={isUpdating}>
          {isUpdating ? 'Modification...' : 'Modifier le produit'}
        </Button>
      </form>
    </Card>
  )
}