import { AdminShell } from "@/components/admin/admin-shell";
import { AuthProvider } from "@/components/admin/auth-provider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
