import db from './db.ts'
import { readFileSync } from "node:fs";

db.exec('DROP TABLE IF EXISTS relatos')

db.exec(`
  CREATE TABLE IF NOT EXISTS relatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    photo BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

if (process.env.NODE_ENV === "development") {
    const photo = readFileSync(
        new URL("../../static/example-image.png", import.meta.url)
    )

    const insert = db.prepare('INSERT INTO relatos (title, description, photo) VALUES (?, ?, ?)')

    insert.run('Relato1', 'Rua ta esburacada :(.', photo)
    insert.run('Learning Svelte', 'SvelteKit makes data fetching straightforward.', photo)
    insert.run('SQLite is Great', 'No server setup required for local development.', photo)

    console.log('Database seeded with sample posts')
}
