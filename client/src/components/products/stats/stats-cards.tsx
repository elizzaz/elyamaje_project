import { Card } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-sm font-medium">Total Produits</h3>
        <p className="mt-2 text-3xl font-bold">12</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">En Stock</h3>
        <p className="mt-2 text-3xl font-bold">8</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Rupture Stock</h3>
        <p className="mt-2 text-3xl font-bold text-red-500">4</p>
      </Card>
    </div>
  )
} 