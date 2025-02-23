import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link'

const recentProducts = [
  { id: 1, name: "Produit 1", price: 29.99, stock: 10 },
  { id: 2, name: "Produit 2", price: 39.99, stock: 5 },
  { id: 3, name: "Produit 3", price: 19.99, stock: 15 },
]

export function ProductsTable() {
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}€</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Link href={`/dashboard/products/${product.id}`}>
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}