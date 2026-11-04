import db from '#lib/db.ts'

export function load() {
	const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()

	return {
		posts
	}
}
