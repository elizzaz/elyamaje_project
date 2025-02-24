'use client'

import { updateProduct } from "@/lib/api";
import { ApiResponse, ApiError } from "@/types/api";
import { Product, UpdateProductInput } from "@/types/product";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productKeys } from "./useProducts";

/**
 * Hook pour mettre à jour un produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, {id: number} & UpdateProductInput>} Mutation pour modifier un produit
 */
export function useUpdateProduct() {
    const queryClient = useQueryClient();
  
    return useMutation<
      ApiResponse<Product>,
      ApiError,
      { id: number } & UpdateProductInput
    >({
      mutationFn: ({ id, ...data }) => updateProduct(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.id),
        });
        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      },
    });
  }