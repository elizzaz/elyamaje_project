import { Product } from './product'

// Types pour les props des composants
export interface ProductTableProps {
  products: Product[]
}

export interface ProductActionButtonProps {
  productId: number
  productName: string
}

export interface ProductFormProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}
