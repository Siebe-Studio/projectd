import { getServerAuthSession } from "~/server/auth";
import SignInButton from "~/components/auth/SignInButton";
import { Dashboard } from "~/components/dashboard/Dashboard";


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
    <div className="w-full flex items-center justify-center">
      <p className="text-3xl">Ingelogd!!!!</p>
    </div>
  );
}
