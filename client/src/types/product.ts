// Types de base pour les produits
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}

// DTOs (Data Transfer Objects)
export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
}