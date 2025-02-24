'use client'

import { deleteProduct } from "@/lib/api";
import { ApiResponse, ApiError } from "@/types/api";
import { Product } from "@/types/product";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productKeys } from "./useProducts";

/**
 * Hook pour supprimer un produit
 * @returns {UseMutationResult<ApiResponse<Product>, ApiError, number>} Mutation pour supprimer un produit
 */
export function useDeleteProduct() {
    const queryClient = useQueryClient();
  
    return useMutation<ApiResponse<Product>, ApiError, number>({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      },
    });
  }