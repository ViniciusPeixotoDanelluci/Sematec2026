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

	const Descriptions = {
		ONE: 'Trecho quebrado pode dificultar a passagem de pedestres.',
		TWO: 'Há sacos de lixo acumulados na calçada.',
		THREE: 'A rua está sem iluminação durante a noite.',
		FOUR: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.'
	}

	console.log("inserindo dados")

    insert.run('Calçada danificada', Descriptions.ONE, ObstacleType.SIDEWALK, 'Santana', 'Rua do Fico', AlertStatus.FIXING, photo)
	insert.run('Descarte irregular de lixo', Descriptions.TWO, ObstacleType.GARBAGE, 'Ipanema', 'Av. Prestes Maia', AlertStatus.STANDBY, photo)
	insert.run('Poste com lâmpada apagada', Descriptions.THREE, ObstacleType.LIGHTINING, 'Jardim Sumaré', 'Rua Afonso de Toledo', AlertStatus.FIXING, photo)
    insert.run('Buraco na pista', Descriptions.FOUR, ObstacleType.HOLE, 'Jardim Guanabara', 'Rua Carlos Pereira da Silva', AlertStatus.FIXING, photo)
    insert.run('Relato5', Descriptions.ONE, ObstacleType.LIGHTINING, 'Saudade', 'Av. da Saudade', AlertStatus.SOLVED, photo)
    insert.run('Relato6', Descriptions.ONE, ObstacleType.HOLE, 'Centro', 'Rua General Glicério', AlertStatus.STANDBY, photo)
    insert.run('Relato7', Descriptions.ONE, ObstacleType.GARBAGE, 'bairro7', 'Rua7', AlertStatus.FIXING, photo)

	console.log("inserção finalizada")
}