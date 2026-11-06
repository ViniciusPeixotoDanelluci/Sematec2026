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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    latitude REAL,
    longitude REAL,
    CHECK (
    (latitude IS NULL AND longitude IS NULL) OR
    (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
    )
  );
`)

// latitude e longitude podem ser adicionados 
// opcionalmente na hora do cadastro
if (process.env.NODE_ENV === "development") {
    _createAlertasTable()

    console.log('Database seedada com alguns samples em cada tabela')
}

function _createAlertasTable() {
	const photo = readFileSync(
        new URL("../../static/development-photos/example-image.png", import.meta.url)
    )

    const insert = db.prepare(
	    'INSERT INTO alertas (title, description, category, neighborhood, street, status, photo, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
	)

	const Descriptions = {
		ONE: 'Trecho quebrado pode dificultar a passagem de pedestres.',
		TWO: 'Há sacos de lixo acumulados na calçada.',
		THREE: 'A rua está sem iluminação durante a noite.',
		FOUR: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.'
	}

	console.log("inserindo dados")

    insert.run('Calçada danificada', Descriptions.ONE, ObstacleType.SIDEWALK, 'Santana', 'Rua do Fico', AlertStatus.FIXING, photo, -21.195374525398787, -50.439949816310936)
	insert.run('Descarte irregular de lixo', Descriptions.TWO, ObstacleType.GARBAGE, 'Ipanema', 'Av. Prestes Maia', AlertStatus.STANDBY, photo, -21.177036868768784, -50.448138731655476)
	insert.run('Poste com lâmpada apagada', Descriptions.THREE, ObstacleType.LIGHTINING, 'Jardim Sumaré', 'Rua Afonso de Toledo', AlertStatus.FIXING, photo, -21.21209893236994, -50.436812816309654)
    insert.run('Buraco na pista', Descriptions.FOUR, ObstacleType.HOLE, 'Jardim Guanabara', 'Rua Carlos Pereira da Silva', AlertStatus.FIXING, photo, -21.21264203141433, -50.471662318160874)
    insert.run('Relato5', Descriptions.ONE, ObstacleType.LIGHTINING, 'Saudade', 'Av. da Saudade', AlertStatus.SOLVED, photo, -21.22423906386229, -50.44454417398051)
    insert.run('Relato6', Descriptions.ONE, ObstacleType.HOLE, 'Centro', 'Rua General Glicério', AlertStatus.STANDBY, photo, -21.206349222637623, -50.43651218932478)
    insert.run('Relato7', Descriptions.ONE, ObstacleType.GARBAGE, 'bairro7', 'Rua7', AlertStatus.FIXING, photo, -21.206349222637623, -50.43651218932478) // lat-lon temporarios

	console.log("inserção finalizada")
}