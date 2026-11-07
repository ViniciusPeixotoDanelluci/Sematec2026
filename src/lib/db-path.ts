import { fileURLToPath } from 'node:url'

export const dbPath =
	process.env.DATABASE_URL || fileURLToPath(new URL('../../local.db', import.meta.url))
