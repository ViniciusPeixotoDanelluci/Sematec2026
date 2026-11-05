import db from '#lib/db.ts'

export function load() {
	const posts = db.prepare('SELECT * FROM relatos ORDER BY created_at DESC').all()

	// return {
	// 	posts
	// }
}
