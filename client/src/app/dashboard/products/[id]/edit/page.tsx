import { Metadata } from "next";
import { EditProductForm } from "@/components/products/forms/edit-product-form";

export const metadata: Metadata = {
  title: "Modifier le produit",
};

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Modifier le produit</h1>
      <EditProductForm productId={parseInt(params.id)} />
    </div>
  );
}
