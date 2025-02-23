import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { EditProductButton } from '@/components/products/buttons/edit-product-button'
import { DeleteProductButton } from '@/components/products/buttons/delete-product-button'
import { ProductDetails } from '@/components/products/details/product-details'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Détails du produit</h1>
        <div className="space-x-2">
          <EditProductButton productId={parseInt(params.id)} />
          <DeleteProductButton 
            productId={parseInt(params.id)} 
            productName="Ce produit" 
          />
        </div>
      </div>
      <ProductDetails productId={parseInt(params.id)} />
    </div>
  )
} 