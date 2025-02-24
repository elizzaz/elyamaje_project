"use client";

import { Card } from "@/components/ui/card";
import { useProduct } from "@/hooks/useProduct";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ProductDetailsProps {
  productId: number;
}

/**
 * Affiche les détails d'un produit
 * @component
 * @param {Object} props - Props du composant
 * @param {number} props.productId - ID du produit à afficher
 * @returns {JSX.Element} Card avec les détails du produit
 */
export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
        </div>
      </Card>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-muted-foreground mt-2">
            {product.description || "Aucune description"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Prix</h3>
            <p className="text-2xl font-bold">{product.price}€</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Stock</h3>
            <p
              className={`text-2xl font-bold ${product.stock === 0 ? "text-red-500" : ""}`}
            >
              {product.stock} unités
            </p>
          </div>
        </div>

        {product.image && (
          <div>
            <h3 className="font-semibold mb-2">Image</h3>
            <Image
              src={product.image}
              alt={product.name}
              className="rounded-lg max-w-sm"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
