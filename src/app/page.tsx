import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-3xl">Currently not signed in!</p>
        
      </main>
    );
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-3xl">Hello</p>
    </main>
  );
}
