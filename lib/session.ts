import { auth } from '@/auth';

/** Returns the authenticated user's id, or null when not signed in. */
export async function getSessionUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}
