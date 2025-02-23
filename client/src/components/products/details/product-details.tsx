'use client'

import { Card } from "@/components/ui/card"
import { useProduct } from "@/hooks/useProducts"
import { notFound } from 'next/navigation'

interface ProductDetailsProps {
  productId: number
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading, error } = useProduct(productId)

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">
          {error.message || 'Une erreur est survenue'}
        </div>
      </Card>
    )
  }

  if (!product) {
    return notFound()
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-muted-foreground mt-2">
            {product.description || 'Aucune description'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Prix</h3>
            <p className="text-2xl font-bold">{product.price}€</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Stock</h3>
            <p className={`text-2xl font-bold ${product.stock === 0 ? 'text-red-500' : ''}`}>
              {product.stock} unités
            </p>
          </div>
        </div>

        {product.image && (
          <div>
            <h3 className="font-semibold mb-2">Image</h3>
            <img 
              src={product.image} 
              alt={product.name}
              className="rounded-lg max-w-sm"
            />
          </div>
        )}
      </div>
    </Card>
  )
} 