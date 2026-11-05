import db from '#lib/db.ts'

export function load() {
	const alerts = db.prepare('SELECT * FROM alertas ORDER BY created_at DESC').all()

	return { alerts }
}
