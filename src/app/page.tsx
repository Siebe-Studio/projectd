import { getServerAuthSession } from "~/server/auth";

import SignInButton from "~/components/auth/SignInButton";
import SignOutButton from "~/components/auth/SignOutButton";

import { Button } from "~/components/ui/button";
import Link from "next/link";

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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <p className="text-3xl">Hello {session.user.name}</p>
      <Button>
        <Link href={`/dashboard`}>Bekijk Dashboard</Link>
      </Button>
      <SignOutButton />
    </main>
  );
}
