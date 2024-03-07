import { api } from "~/trpc/server";


export default async function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-3xl">Producten</p>
    </main>
  );
}
