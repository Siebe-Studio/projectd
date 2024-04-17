"use client";

import CreateProduct from "~/components/products/create-product";
import ProductTable from "~/components/products/ProductTable";
import { columns, type ProductRow } from "~/components/products/ProductCols";
import { api } from "~/trpc/react";

const data: ProductRow[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    serialNumber: "123456",
    item: {
      id: 1,
      serialNumber: "123456",
      createdAt: "2022-01-01",
    },
  }
]


export default function Home() {

  const products = api.product.getProducts.useQuery().data;
  

  return (
    <div className="w-full flex gap-12">
      <div className="flex-1">
        <ProductTable columns={columns} data={data} />
      </div>
      <CreateProduct />
    </div>
  );
}
