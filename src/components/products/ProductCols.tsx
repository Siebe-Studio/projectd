"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

import Link from "next/link"

export type ProductRow = {
  id: number
  name: string
  description: string
  serialNumber: string
  item: {
    id: number
    serialNumber: string
    createdAt: string
  }
}


export const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Naam",
  },
  {
    accessorKey: "description",
    header: "Beschrijving",
  },
  {
    accessorKey: "serialNumber",
    header: "Serienummer",
  },
  {
    header: "Acties",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.item.serialNumber)}
            >
              Kopieer Serienummer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/${product.id}`}>Bekijk Product</Link></DropdownMenuItem>
            <DropdownMenuItem>Verwijder product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]