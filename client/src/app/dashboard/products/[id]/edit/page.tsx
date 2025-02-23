import { Metadata } from 'next'
import { EditProductForm } from '@/components/products/forms/edit-product-form'

interface EditProductPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Modifier le produit',
  description: 'Modifier les informations du produit',
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Modifier le produit</h1>
      <EditProductForm productId={parseInt(params.id)} />
    </div>
  )
} 