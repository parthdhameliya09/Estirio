import "dotenv/config";
import postgres from "postgres";

for (const db of ["postgres", "Estirio", "estirio"]) {
  const sql = postgres(`postgresql://postgres@127.0.0.1/${db}`);
  try {
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name`;
    const migrations = await sql`
      SELECT migration_name FROM _prisma_migrations ORDER BY finished_at
    `.catch(() => []);
    console.log(`\n=== ${db} ===`);
    console.log("Tables:", tables.map((t) => t.table_name).join(", ") || "(none)");
    console.log("Migrations:", migrations.map((m) => m.migration_name).join(", ") || "(none)");
  } catch (e) {
    console.log(`\n=== ${db} === ERROR:`, e.message);
  } finally {
    await sql.end();
  }
}
