'use server'

import { 
  Product, 
  CreateProductInput, 
  UpdateProductInput, 
} from '@/types/product'
import { env } from '@/config/env'
import { ApiResponse } from '@/types/api'
import { ApiError } from 'next/dist/server/api-utils'

const API_URL = env.api.url

// Configuration de l'API côté serveur uniquement
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

export async function createProduct(data: CreateProductInput): Promise<ApiResponse<Product>> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

export async function updateProduct(
  id: number, 
  data: UpdateProductInput
): Promise<ApiResponse<Product>> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

export async function deleteProduct(id: number): Promise<ApiResponse<Product>> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}