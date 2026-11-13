// Validação do inventário antes do build (briefing, seções 37, 50 e 53).
// Uso: npm run validate
import { readFileSync, readdirSync } from "fs";
const files = readdirSync("data").filter((f) => f.endsWith(".ts")).map((f) => [f, readFileSync(`data/${f}`, "utf8")]);
const all = files.map(([, s]) => s).join("\n");
const ids = new Set([...all.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]));
const problems = [];
for (const [f, s] of files) {
  for (const m of s.matchAll(/related:\s*\[([^\]]*)\]/g))
    for (const r of m[1].matchAll(/"([^"]+)"/g)) if (!ids.has(r[1]) && !(r[1].startsWith("mod-") && ids.has(r[1].slice(4)))) problems.push(`${f}: related aponta para id inexistente "${r[1]}"`);
  for (const m of s.matchAll(/(hero|media):\s*\{([^}]*)\}/g)) if (!/alt:/.test(m[2])) problems.push(`${f}: imagem sem alt`);
  if (s.includes("—")) problems.push(`${f}: contém travessão (—)`);
}
const unverified = [...all.matchAll(/value:\s*"([^"]+)"[^}]*verified:\s*false/gs)].map((m) => m[1]);
if (problems.length) { console.error("Inventário com problemas:\n- " + problems.join("\n- ")); process.exit(1); }
console.log(`Inventário ok: ${ids.size} ids. Números não verificados (ocultos na tela): ${unverified.join(", ") || "nenhum"}.`);
