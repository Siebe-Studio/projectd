"use client";

import { api } from "~/trpc/react";


export default function ProductPage({ params }: { params: { id: string } }) {

  const product = api.product.getProductsById.useQuery(params.id).data;

  console.log(product);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {product?.name}
    </div>
  );
}
