"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { toast } from "sonner";
import type { CreateProductInput } from "@/types/product";
import { ApiError } from "@/types/api";

/**
 * Formulaire de création d'un produit
 * @component
 * @returns {JSX.Element} Formulaire avec les champs nécessaires
 */
export function CreateProductForm() {
  const router = useRouter();
  const { mutate: createProduct, isPending } = useCreateProduct();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData: CreateProductInput = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      image: formData.get("image") as string,
    };

    createProduct(productData, {
      onSuccess: () => {
        toast.success("Produit créé avec succès");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (error: ApiError) => {
        toast.error(`Erreur: ${error.message}`);
      },
    });
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nom <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description du produit..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">
            Prix <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">
            Stock <span className="text-red-500">*</span>
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={0}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">URL image</Label>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Création..." : "Créer le produit"}
        </Button>
      </form>
    </Card>
  );
}
