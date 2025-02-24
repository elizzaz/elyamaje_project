"use client";

import { AddProductButton } from "@/components/products/buttons/add-product-button";
interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <AddProductButton />
    </div>
  );
}
