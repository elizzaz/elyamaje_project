'use client'

import { createProduct } from "@/lib/api";
import { ApiResponse, ApiError } from "@/types/api";
import { Product, CreateProductInput } from "@/types/product";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productKeys } from "./useProducts";

/**
 * Hook pour créer un nouveau produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, CreateProductInput>} Mutation pour créer un produit
 */
export function useCreateProduct() {
    const queryClient = useQueryClient();
  
    return useMutation<ApiResponse<Product>, ApiError, CreateProductInput>({
      mutationFn: createProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      },
    });
  }