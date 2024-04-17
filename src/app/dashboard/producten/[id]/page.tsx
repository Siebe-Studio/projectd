export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {params.id}
    </div>
  );
}
