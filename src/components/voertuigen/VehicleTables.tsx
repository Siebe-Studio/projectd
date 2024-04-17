"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "~/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const invoices = [
  {
        plate: "1",
        vehicle_id: "001",
        description: "Schoonmaak beurd",
        location: "Rotterdam",
  },
  {
      plate: "2",
      vehicle_id: "002",
      description: "Moet naar APK",
      location: "Schiedam",
  },
  {
      plate: "3",
      vehicle_id: "003",
      description: "",
      location: "Amsterdam",
  },
  {
      plate: "4",
      vehicle_id: "004",
      description: "",
      location: "Amsterdam",
  },
  {
      plate: "5",
      vehicle_id: "005",
      description: "",
      location: "Rotterdam",
  },
  {
      plate: "6",
      vehicle_id: "006",
      description: "",
      location: "Utrecht",
  },
  {
      plate: "7",
      vehicle_id: "007",
      description: "",
      location: "Schiedam",
  },
  {
      plate: "8",
      vehicle_id: "008",
      description: "",
      location: "Utrecht",
  }
]
export default function VehicleTable() {
  return (
  <Card className="flex-1">
      <CardHeader><CardTitle>Voertuigen</CardTitle></CardHeader>
      <CardContent>
    <Table className="md:w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Nummer Plaat</TableHead>
          <TableHead className="w-[100px]">ID</TableHead>         
          <TableHead className="w-[250px]">Location</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.plate}>
            <TableCell className="font-medium">{invoice.plate}</TableCell>
            <TableCell>{invoice.vehicle_id}</TableCell>
            <TableCell>{invoice.location}</TableCell>
            <TableCell>{invoice.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
  </Card>
  )
}