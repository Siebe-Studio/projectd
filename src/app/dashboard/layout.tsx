import Sidebar from "~/components/dashboard/Sidebar";
import { getServerAuthSession } from "~/server/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full gap-2">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
