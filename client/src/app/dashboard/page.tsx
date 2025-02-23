import { Metadata } from 'next'
import { Header } from "@/components/header/header"
import { StatsCards } from "@/components/products/stats/stats-cards"
import { ProductsTable } from "@/components/products/table/products-table"    

export const metadata: Metadata = {
  title: "Dashboard | Vue d'ensemble",
  description: "Vue d'ensemble des produits",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header title="Vue d'ensemble" />
      <StatsCards />
      <ProductsTable />
    </div>
  )
} 