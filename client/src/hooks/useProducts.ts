'use client'

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { ApiError, PaginatedResponse } from "@/types/api";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
};

/**
 * Hook pour récupérer la liste des produits
 * @param {number} page - Numéro de la page
 * @param {number} limit - Nombre d'éléments par page
 * @returns {UseQueryResult<PaginatedResponse<Product>, ApiError>} Query result contenant les produits paginés
 */
export function useProducts(page: number = 1, limit: number = 10) {
  return useQuery<PaginatedResponse<Product>, ApiError>({
    queryKey: [...productKeys.lists(), { page, limit }],
    queryFn: () => getProducts(page, limit),
  });
}