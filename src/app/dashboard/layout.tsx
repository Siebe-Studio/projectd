import { Dashboard } from "~/components/dashboard/Dashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
