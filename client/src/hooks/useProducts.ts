'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '@/lib/api'
import { 
  Product, 
  CreateProductInput, 
  UpdateProductInput, 
} from '@/types/product'
import { ApiResponse, ApiError, PaginatedResponse } from '@/types/api'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
}

/**
 * Hook pour récupérer la liste des produits
 * @param {number} page - Numéro de la page
 * @param {number} limit - Nombre d'éléments par page
 * @returns {UseQueryResult<PaginatedResponse<Product>, ApiError>} Query result contenant les produits paginés
 */
export function useProducts(page: number = 1, limit: number = 10) {
  return useQuery<PaginatedResponse<Product>, ApiError>({
    queryKey: [...productKeys.lists(), { page, limit }],
    queryFn: () => getProducts(page, limit)
  })
}

/**
 * Hook pour récupérer un produit spécifique
 * @param {number} id - ID du produit à récupérer
 * @returns {UseQueryResult<Product, ApiError>} Query result contenant le produit ou une erreur
 */
export function useProduct(id: number) {
  return useQuery<Product, ApiError>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id)
  })
}

/**
 * Hook pour créer un nouveau produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, CreateProductInput>} Mutation pour créer un produit
 */
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<Product>, ApiError, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

/**
 * Hook pour mettre à jour un produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, {id: number} & UpdateProductInput>} Mutation pour modifier un produit
 */
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

/**
 * Hook pour supprimer un produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, number>} Mutation pour supprimer un produit
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<Product>, ApiError, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
} 