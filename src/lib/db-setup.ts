import db from './db.ts'
import { readFileSync } from "node:fs";

db.exec('DROP TABLE IF EXISTS alertas')

// Cria a Tabela de Alertas 
db.exec(`
  CREATE TABLE IF NOT EXISTS alertas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    photo BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


	// 	{
	// 		id: 1,
	// 		title: 'Buraco na pista',
	// 		description: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.',
	// 		category: 'Buraco',
	// 		neighborhood: 'Centro',
	// 		reportedAt: 'Hoje, 09:20'
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Poste com lâmpada apagada',
	// 		description: 'A rua está sem iluminação durante a noite.',
	// 		category: 'Iluminação',
	// 		neighborhood: 'Vila Nova',
	// 		reportedAt: 'Hoje, 08:45'
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Descarte irregular de lixo',
	// 		description: 'Há sacos de lixo acumulados na calçada.',
	// 		category: 'Lixo',
	// 		neighborhood: 'Centro',
	// 		reportedAt: 'Ontem, 18:10'
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'Calçada danificada',
	// 		description: 'Trecho quebrado pode dificultar a passagem de pedestres.',
	// 		category: 'Calçada',
	// 		neighborhood: 'Jardim das Flores',
	// 		reportedAt: 'Ontem, 15:30'
	// 	}
	// ]


if (process.env.NODE_ENV === "development") {
    _createAlertasTable()

    console.log('Database seedada com alguns samples em cada tabela')
}


function _createAlertasTable() {
	const photo = readFileSync(
        new URL("../../static/example-image.png", import.meta.url)
    )

    const insert = db.prepare('INSERT INTO alertas (title, description, photo) VALUES (?, ?, ?)')

    insert.run('Relato1', 'Rua ta esburacada :(.', photo)
    insert.run('Relato2', 'Alagamento na rua.', photo)
    insert.run('Relato3', 'Lixo entulhado a 2 anos.', photo)
}