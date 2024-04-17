import { getServerAuthSession } from "~/server/auth";
import SignInButton from "~/components/auth/SignInButton";
import CreateProduct from "~/components/products/create-product";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6">
        <p className="text-3xl">Momenteel niet ingelogd</p>
        <SignInButton />
      </main>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CreateProduct />
    </div>
  );
}
