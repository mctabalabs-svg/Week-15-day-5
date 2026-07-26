import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) redirect("/login");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") redirect("/");
  } catch {
    redirect("/login");
  }

  return <>{children}</>;
}
