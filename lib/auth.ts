const COOKIE_NAME = 'balkan_session'

type SessionPayload = {
  sub: number
  email: string
  exp: number
}

function base64UrlEncode(input: ArrayBuffer | Uint8Array | string) {
  const bytes =
    typeof input === 'string'
      ? new TextEncoder().encode(input)
      : input instanceof Uint8Array
        ? input
        : new Uint8Array(input)

  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  const b64 = Buffer.from(binary, 'binary').toString('base64')
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function base64UrlDecodeToBytes(input: string) {
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
  const buf = Buffer.from(padded, 'base64')
  return new Uint8Array(buf)
}

async function hmacSha256(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return base64UrlEncode(sig)
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

export function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  // In production we require a real secret to be set. Fail fast to avoid silent insecurity.
  if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error('Missing AUTH_SECRET in production environment. Set AUTH_SECRET env var.')
  }
  return secret || 'dev-only-secret-change-me'
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

export async function createSessionToken(payload: Omit<SessionPayload, 'exp'>, maxAgeSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds
  const body: SessionPayload = { ...payload, exp }
  const data = base64UrlEncode(JSON.stringify(body))
  const sig = await hmacSha256(getAuthSecret(), data)
  return `${data}.${sig}`
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token) return null
  const [data, sig] = token.split('.')
  if (!data || !sig) return null
  const expected = await hmacSha256(getAuthSecret(), data)
  const a = base64UrlDecodeToBytes(sig)
  const b = base64UrlDecodeToBytes(expected)
  if (!timingSafeEqualBytes(a, b)) return null

  let payload: SessionPayload
  try {
    payload = JSON.parse(Buffer.from(base64UrlDecodeToBytes(data)).toString('utf8')) as SessionPayload
  } catch {
    return null
  }
  if (!payload?.sub || !payload?.email || !payload?.exp) return null
  if (payload.exp < Math.floor(Date.now() / 1000)) return null
  return payload
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iterations = 120_000
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', iterations, salt },
    key,
    256
  )
  const hash = new Uint8Array(bits)
  return `pbkdf2$sha256$${iterations}$${base64UrlEncode(salt)}$${base64UrlEncode(hash)}`
}

export async function verifyPassword(password: string, stored: string) {
  const parts = stored.split('$')
  if (parts.length !== 5) return false
  const [kind, algo, iterStr, saltB64, hashB64] = parts
  if (kind !== 'pbkdf2' || algo !== 'sha256') return false
  const iterations = Number(iterStr)
  if (!Number.isFinite(iterations) || iterations <= 0) return false

  const salt = base64UrlDecodeToBytes(saltB64)
  const expected = base64UrlDecodeToBytes(hashB64)
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', iterations, salt },
    key,
    expected.length * 8
  )
  const actual = new Uint8Array(bits)
  return timingSafeEqualBytes(actual, expected)
}

