// Lightweight input validation. Throws `ValidationError` with a safe message.

export class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ValidationError";
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function str(
  value: unknown,
  field: string,
  opts: { min?: number; max?: number; optional?: boolean } = {}
): string | undefined {
  if (value === undefined || value === null || value === "") {
    if (opts.optional) return undefined;
    throw new ValidationError(`${field} is required`);
  }
  if (typeof value !== "string") throw new ValidationError(`${field} must be a string`);
  const v = value.trim();
  if (opts.min !== undefined && v.length < opts.min)
    throw new ValidationError(`${field} must be at least ${opts.min} chars`);
  if (opts.max !== undefined && v.length > opts.max)
    throw new ValidationError(`${field} must be at most ${opts.max} chars`);
  return v;
}

export function email(value: unknown, field = "email"): string {
  const v = str(value, field, { max: 254 });
  if (!v || !EMAIL_RE.test(v)) throw new ValidationError(`Invalid ${field}`);
  return v.toLowerCase();
}

export function oneOf<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[]
): T {
  const v = str(value, field, { max: 64 });
  if (!v || !allowed.includes(v as T))
    throw new ValidationError(`${field} must be one of: ${allowed.join(", ")}`);
  return v as T;
}

export function isoDate(value: unknown, field: string): Date {
  const v = str(value, field, { max: 40 });
  const d = new Date(v as string);
  if (Number.isNaN(d.getTime())) throw new ValidationError(`${field} must be a valid date`);
  return d;
}

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const data = await req.json();
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new ValidationError("Body must be a JSON object");
    return data as Record<string, unknown>;
  } catch (e) {
    if (e instanceof ValidationError) throw e;
    throw new ValidationError("Invalid JSON body");
  }
}
