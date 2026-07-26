import { Pool } from "pg";

const globalForPg = globalThis;

const pool = globalForPg.__pgPool ?? new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false },
});

if (process.env.NODE_ENV !== "production") globalForPg.__pgPool = pool;

function isRecoveryModeError(error) {
  const recoveryCodes = ["57P03", "57P04", "57P01", "57P02", "57014"];
  
  const checkAllStrings = (obj) => {
    if (!obj || typeof obj !== "object") return String(obj ?? "").toLowerCase();
    const strings = [];
    for (const key of Reflect.ownKeys(obj)) {
      const val = obj[key];
      if (typeof val === "string") strings.push(val.toLowerCase());
    }
    return strings.join(" ");
  };
  
  const code = error?.code;
  if (code && (recoveryCodes.includes(code) || code.startsWith("57"))) return true;
  
  const fullMsg = checkAllStrings(error);
  if (fullMsg.includes("recovery mode")) return true;
  if (fullMsg.includes("starting up")) return true;
  
  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function queryWithRetry(text, params, maxRetries = 8, baseDelayMs = 1000) {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await pool.query(text, params);
    } catch (error) {
      lastError = error;
      if (isRecoveryModeError(error) && attempt < maxRetries - 1) {
        await sleep(baseDelayMs * 2 ** attempt);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export { isRecoveryModeError, queryWithRetry };
export default pool;
