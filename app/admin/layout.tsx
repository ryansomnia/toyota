import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const payload = await verifyJWT(token);
  if (!payload) redirect("/admin/login");

  const user = { name: String(payload.name), email: String(payload.email), role: String(payload.role) };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <AdminSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar user={user} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}