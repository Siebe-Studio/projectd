
"use client"

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

//#region All Schema

export type columnSchema = {
  id: string
  amount: number
  status: "Inspectie" | "Gebruiksklaar" | "Onderhoud" | "Defect"
  product: string
  location: string
}

const data: columnSchema[] = [
  {
    id: "m5gr84i9",
    amount: 31,
    status: "Gebruiksklaar",
    product: "Pomp",
    location: "Rotterdam"
  },
  {
    id: "3u1reuv4",
    amount: 22,
    status: "Onderhoud",
    product: "Pomp",
    location: "Amsterdam"
  },
  {
    id: "derv1ws0",
    amount: 37,
    status: "Inspectie",
    product: "Gereedchap",
    location: "Limburg"
  },
  {
    id: "5kma53ae",
    amount: 4,
    status: "Inspectie",
    product: "Water pomp",
    location: "Utrecht"
  },
  {
    id: "bhqecj4p",
    amount: 71,
    status: "Defect",
    product: "Water Pomp",
    location: "Schiedam"
  },
]

export const columns: ColumnDef<columnSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox checked = {table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange = {(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label = "Select all"/> ),

    cell: ({ row }) => (<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row"/> ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => ( <div className="capitalize">{row.getValue("status")}</div>),
  },

  {
    accessorKey: "location",
    header: "Locatie",
    cell: ({ row }) => ( <div className="capitalize">{row.getValue("location")}</div>),
  },

  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Producten
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("product")}</div>,
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Hoeveelheid</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return <div className="text-right font-medium">{amount}</div>
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => { const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Kopieer ID</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>Bekijk Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )},
  },

]

//#endregion All Schema

export function CategoryTabs() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data, columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full flex-col felx grid-cols-5">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="warehouse">Warenhuis</TabsTrigger>
        <TabsTrigger value="vehicles">Voertuigen</TabsTrigger>
        <TabsTrigger value="clients">Klanten</TabsTrigger>
        <TabsTrigger value="history">Geschiedenis</TabsTrigger>
      </TabsList>

      <TabsContent value="all">

          <div className="w-full">
          <div className="flex items-center py-4">
            <Input placeholder="Filter producten..."
              value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("product")?.setFilterValue(event.target.value)}
              className="max-w-sm"/>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">Filter<ChevronDown className="ml-2 h-4 w-4"/></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                    return (
                      <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}> {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}> {headerGroup.headers.map((header) => { return (<TableHead key={header.id}> 
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext() )}
                    </TableHead> )})}
                  </TableRow> ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}> {flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))} </TableRow>
                  ))) : (<TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Geen resultaat gevonden.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Terug</Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Volgende</Button>
            </div>
          </div>
        </div>

      </TabsContent>

      <TabsContent value="warehouse">
      </TabsContent>

      <TabsContent value="vehicles">
      </TabsContent>

      <TabsContent value="clients">
      </TabsContent>

      <TabsContent value="history">
      </TabsContent>
    </Tabs>
  )
}
