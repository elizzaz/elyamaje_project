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

/**
 * Récupère la liste des produits depuis l'API
 * @returns {Promise<Product[]>} Liste des produits
 * @throws {ApiError} En cas d'erreur de l'API
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

/**
 * Récupère un produit spécifique
 * @param {number} id - ID du produit
 * @returns {Promise<Product>} Le produit demandé
 * @throws {ApiError} En cas d'erreur de l'API
 */
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) {
    const error = await response.json()
    throw new ApiError(error.message, error.code)
  }
  return response.json()
}

/**
 * Crée un nouveau produit
 * @param {CreateProductInput} data - Données du produit à créer
 * @returns {Promise<ApiResponse<Product>>} Réponse de l'API avec le produit créé
 * @throws {ApiError} En cas d'erreur de l'API
 */
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

/**
 * Met à jour un produit existant
 * @param {number} id - ID du produit à modifier
 * @param {UpdateProductInput} data - Nouvelles données du produit
 * @returns {Promise<ApiResponse<Product>>} Réponse de l'API avec le produit modifié
 * @throws {ApiError} En cas d'erreur de l'API
 */
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

/**
 * Supprime un produit
 * @param {number} id - ID du produit à supprimer
 * @returns {Promise<ApiResponse<Product>>} Réponse de l'API
 * @throws {ApiError} En cas d'erreur de l'API
 */
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