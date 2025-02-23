import { Metadata } from 'next'
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ProductsTable } from "@/components/dashboard/products-table"    

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