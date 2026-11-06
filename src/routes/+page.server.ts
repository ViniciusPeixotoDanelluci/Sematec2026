import db from '#lib/db.ts'
import type { Alert } from '#lib/types/alert.type.ts'

export function load() {
	const alerts = db.prepare<[], Alert>('SELECT * FROM alertas ORDER BY created_at DESC').all()


	return { alerts }
}
