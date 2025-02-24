"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { ViewProductButton } from "@/components/products/buttons/view-product-button";
import { EditProductButton } from "@/components/products/buttons/edit-product-button";
import { DeleteProductButton } from "@/components/products/buttons/delete-product-button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

/**
 * Table listant tous les produits
 * @component
 * @returns {JSX.Element} Table avec la liste des produits et leurs actions
 */
export function ProductsTable({ currentPage }: { currentPage: number }) {
  const { data, isLoading, error } = useProducts(currentPage, ITEMS_PER_PAGE);
  const { replace } = useRouter();

  const updateCurrentPage = (page: number) => {
    replace(`/dashboard?page=${page}`);
  };

  if (isLoading) {
    return (
      <Card className="mt-6">
        <div className="p-6">
          <h3 className="text-lg font-medium">Chargement des produits...</h3>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-red-500">
            {error.message || "Erreur lors du chargement des produits"}
          </h3>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <div className="p-6">
        <h3 className="text-lg font-medium">Produits Récents</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}€</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <ViewProductButton productId={product.id} />
                  <EditProductButton productId={product.id} />
                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data && data.metadata && (
        <div className="p-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {data.metadata.totalItems} produits au total
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) updateCurrentPage(currentPage - 1);
                  }}
                  aria-disabled={currentPage <= 1}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm">
                  Page {data.metadata.currentPage} sur{" "}
                  {data.metadata.totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < data.metadata.totalPages) {
                      updateCurrentPage(currentPage + 1);
                    }
                  }}
                  aria-disabled={currentPage >= data.metadata.totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
}
