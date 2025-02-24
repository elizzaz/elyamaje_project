import { Metadata } from "next";
import { CreateProductForm } from "@/components/products/forms/create-product-form";

export const metadata: Metadata = {
  title: "Créer un Produit",
};

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Créer un Produit</h1>
      <CreateProductForm />
    </div>
  );
}
