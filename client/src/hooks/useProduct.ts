'use client'

import { getProduct } from "@/lib/api";
import { ApiError } from "@/types/api";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./useProducts";

/**
 * Hook pour récupérer un produit spécifique
 * @param {number} id - ID du produit à récupérer
 * @returns {UseQueryResult<Product, ApiError>} Query result contenant le produit ou une erreur
 */
export function useProduct(id: number) {
    return useQuery<Product, ApiError>({
      queryKey: productKeys.detail(id),
      queryFn: () => getProduct(id),
    });
  }
  