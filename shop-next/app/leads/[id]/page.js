import { queryWithRetry } from "@/lib/db";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function LeadDetailPage({ params }) {
  const { id } = await params;
  const { rows } = await queryWithRetry("SELECT * FROM leads WHERE id = $1", [id]);
  const lead = rows[0];
  if (!lead) notFound();
  return (
    <main>
      <h1>{lead.name || lead.wa_phone}</h1>
      <p>Status: {lead.status}</p>
      <p>Source: {lead.source}</p>
    </main>
  );
}
