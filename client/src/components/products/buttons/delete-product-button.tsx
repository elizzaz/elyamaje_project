"use client";

import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { ProductActionButtonProps } from "@/types/components";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function DeleteProductButton({
  productId,
  productName,
}: ProductActionButtonProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = async () => {
    deleteProduct(productId, {
      onSuccess: () => {
        toast.success("Produit supprimé avec succès");
      },
      onError: (error) => {
        toast.error(`Erreur: ${error.message}`);
      },
    });
  };

  return (
    <ConfirmDialog
      title="Supprimer le produit"
      description={`Êtes-vous sûr de vouloir supprimer "${productName}" ? Cette action est irréversible.`}
      confirmText="Supprimer"
      cancelText="Annuler"
      variant="destructive"
      onConfirm={handleDelete}
    >
      <Button variant="destructive" size="sm" disabled={isPending}>
        <Trash2 className="h-4 w-4 mr-1" />
        {isPending ? "Suppression..." : "Supprimer"}
      </Button>
    </ConfirmDialog>
  );
}
