import { cookies } from 'next/headers'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'

export async function getSessionUser() {
  const jar = await cookies()
  const token = jar.get(getSessionCookieName())?.value
  return verifySessionToken(token)
}

