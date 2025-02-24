import { Product } from "./product";

export interface ProductTableProps {
  products: Product[];
}

export interface ProductActionButtonProps {
  productId: number;
  productName: string;
}

export interface ProductFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
