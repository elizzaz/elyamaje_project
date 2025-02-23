export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}

export type CreateProductInput = Omit<Product, 'id'>;
export type UpdateProductInput = Partial<CreateProductInput>; 