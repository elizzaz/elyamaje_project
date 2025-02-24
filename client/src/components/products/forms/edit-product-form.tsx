'use client'

import { useRouter, notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useProduct, useUpdateProduct } from '@/hooks/useProducts'
import { toast } from 'sonner'
import { UpdateProductInput } from '@/types/product'

interface EditProductFormProps {
  productId: number
}

/**
 * Formulaire d'édition d'un produit
 * @component
 * @param {Object} props - Props du composant
 * @param {number} props.productId - ID du produit à modifier
 * @returns {JSX.Element} Formulaire pré-rempli avec les données du produit
 */
export function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter()
  const { data: product, isLoading: isLoadingProduct, error } = useProduct(productId)
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

  if (error || !product) {
    notFound()
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const productData: UpdateProductInput = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      image: formData.get('image') as string,
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
          <Label htmlFor="name">
            Nom <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={product.name}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description"
            defaultValue={product.description || ''}
            placeholder="Description du produit..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">
            Prix <span className="text-red-500">*</span>
          </Label>
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
          <Label htmlFor="stock">
            Stock <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            min="0" 
            defaultValue={product.stock}
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">URL image</Label>
          <Input 
            id="image" 
            name="image" 
            type="url"
            defaultValue={product.image}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isUpdating}>
          {isUpdating ? 'Modification...' : 'Modifier le produit'}
        </Button>
      </form>
    </Card>
  )
}