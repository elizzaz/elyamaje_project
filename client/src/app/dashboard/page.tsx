import { Metadata } from 'next'
import { Header } from "@/components/header/header-table"
import { ProductsTable } from "@/components/products/table/products-table"    

export const metadata: Metadata = {
  title: "Dashboard | Vue d'ensemble"
}

export default async function DashboardPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col gap-6">
      <Header title="Vue d'ensemble" />
      <ProductsTable currentPage={currentPage} />
    </div>
  )
} 