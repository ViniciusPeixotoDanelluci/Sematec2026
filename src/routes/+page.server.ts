import db from '#lib/db.ts'
import type { Alert } from '#lib/types/alert.type.ts'

export function load() {
	type AlertRow = Alert & { photo: Buffer }

	const rows = db.prepare<[], AlertRow>('SELECT * FROM alertas ORDER BY created_at DESC').all()
	const alerts = rows.map(({ photo, ...alert }) => {
		const mimeType =
			photo[0] === 0xff && photo[1] === 0xd8 && photo[2] === 0xff ? 'image/jpeg' : 'image/png'

		return {
			...alert,
			photo: `data:${mimeType};base64,${photo.toString('base64')}`
		}
	})

	return { alerts }
}
