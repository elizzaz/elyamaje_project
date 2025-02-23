'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '@/lib/api'
import { 
  Product, 
  CreateProductInput, 
  UpdateProductInput, 
} from '@/types/product'
import { ApiResponse, ApiError } from '@/types/api'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
}

export function useProducts() {
  return useQuery<Product[], ApiError>({
    queryKey: productKeys.lists(),
    queryFn: getProducts
  })
}

export function useProduct(id: number) {
  return useQuery<Product, ApiError>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id)
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<Product>, ApiError, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation<
    ApiResponse<Product>, 
    ApiError, 
    { id: number } & UpdateProductInput
  >({
    mutationFn: ({ id, ...data }) => updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<Product>, ApiError, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
} 