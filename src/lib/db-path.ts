import { fileURLToPath } from 'node:url'

export const dbPath = fileURLToPath(new URL('../../local.db', import.meta.url))
