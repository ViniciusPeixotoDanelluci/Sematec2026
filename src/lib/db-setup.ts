import db from './db.ts'
import { readFileSync } from "node:fs";

const ObstacleType = {
    HOLE: 'Buraco',
    LIGHTINING: 'Iluminação',
    GARBAGE: 'Lixo',
    SIDEWALK: 'Calçada'
}
const AlertStatus = {
    STANDBY: 'Em Espera',
    FIXING: 'Sendo Resolvido',
    SOLVED: 'Resolvido!'
}

db.exec('DROP TABLE IF EXISTS alertas')

db.exec(`
  CREATE TABLE IF NOT EXISTS alertas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
	category TEXT NOT NULL,
	neighborhood TEXT NOT NULL,
	street TEXT NOT NULL,
	status TEXT NOT NULL,
    photo BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)


if (process.env.NODE_ENV === "development") {
    _createAlertasTable()

    console.log('Database seedada com alguns samples em cada tabela')
}

function _createAlertasTable() {
	const photo = readFileSync(
        new URL("../../static/development-photos/example-image.png", import.meta.url)
    )

    const insert = db.prepare(
		'INSERT INTO alertas (title, description, category, neighborhood, street, status, photo) VALUES (?, ?, ?, ?, ?, ?, ?)'
	)
// RUA:              BAIRRO:
// rua do fico, santana
// av. prestes maia, ipanema
// rua afonso de todelo, jardim sumaré
// rua carlos pereira da silva, jardim guanabara
// av. brasilia, jardim nova yorque
// av. da saudade, saudade
// rua general glicério, centro
	console.log("inserindo dados")
    insert.run('Relato1', 'Rua ta esburacada :(.', ObstacleType.HOLE, 'bairro1', 'Rua1', AlertStatus.FIXING, photo)
    insert.run('Relato2', 'Alagamento na rua.', ObstacleType.SIDEWALK, 'bairro2', 'Rua2', AlertStatus.STANDBY, photo)
    insert.run('Relato3', 'Lixo entulhado a 2 anos.', ObstacleType.GARBAGE, 'bairro3', 'Rua3', AlertStatus.FIXING, photo)
    insert.run('Relato4', 'Calcaçada cheia de rachadura, ta inandavel!.', ObstacleType.SIDEWALK, 'bairro4', 'Rua4', AlertStatus.FIXING, photo)
    insert.run('Relato5', 'Os Postes não tão funcionando.', ObstacleType.LIGHTINING, 'bairro5', 'Rua5', AlertStatus.FIXING, photo)
    insert.run('Relato6', 'Rua Com Buraco aqui.', ObstacleType.HOLE, 'bairro6', 'Rua6', AlertStatus.FIXING, photo)
    insert.run('Relato7', 'Pilha de lixo não removida.', ObstacleType.GARBAGE, 'bairro7', 'Rua7', AlertStatus.FIXING, photo)

	console.log("inserção finalizada")
}