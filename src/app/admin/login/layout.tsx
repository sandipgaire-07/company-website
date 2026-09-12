import { Toaster } from "sonner";

// This layout overrides the parent admin layout for the login page only.
// The login page should NOT have the sidebar/header.
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
