import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <Link href="/dashboard/products/new">
        <Button>Ajouter un produit</Button>
      </Link>
    </div>
  )
}