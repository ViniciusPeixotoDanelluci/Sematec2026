import { AlertStatus } from '#lib/types/alert-status.type.ts'
import type { Alert } from '#lib/types/alert.type.ts'
import { ObstacleType } from '#lib/types/obstacle-type.ts'

export const alerts: Alert[] = [
	{
		id: 1,
		title: 'Calçada danificada',
		description: 'Trecho quebrado pode dificultar a passagem de pedestres.',
		category: ObstacleType.SIDEWALK,
		neighborhood: 'Santana',
		street: 'Rua do Fico',
		status: AlertStatus.FIXING,
		created_at: '2026-11-07 12:00:00',
		latitude: -21.195374525398787,
		longitude: -50.439949816310936,
		photo: '/development-photos/images_3.jpeg'
	},
	{
		id: 2,
		title: 'Descarte irregular de lixo',
		description: 'Há sacos de lixo acumulados na calçada.',
		category: ObstacleType.GARBAGE,
		neighborhood: 'Ipanema',
		street: 'Av. Prestes Maia',
		status: AlertStatus.STANDBY,
		created_at: '2026-11-06 12:00:00',
		latitude: -21.177036868768784,
		longitude: -50.448138731655476,
		photo: '/development-photos/Imagem-7.jpg'
	},
	{
		id: 3,
		title: 'Poste com lâmpada apagada',
		description: 'A rua está sem iluminação durante a noite.',
		category: ObstacleType.LIGHTINING,
		neighborhood: 'Jardim Sumaré',
		street: 'Rua Afonso de Toledo',
		status: AlertStatus.FIXING,
		created_at: '2026-11-05 12:00:00',
		latitude: -21.21209893236994,
		longitude: -50.436812816309654,
		photo: '/development-photos/images_6.jpeg'
	},
	{
		id: 4,
		title: 'Buraco na pista',
		description: 'Buraco grande perto da faixa de pedestres, dificultando a passagem.',
		category: ObstacleType.HOLE,
		neighborhood: 'Jardim Guanabara',
		street: 'Rua Carlos Pereira da Silva',
		status: AlertStatus.FIXING,
		created_at: '2026-11-04 12:00:00',
		latitude: -21.21264203141433,
		longitude: -50.471662318160874,
		photo: '/development-photos/images_1.jpeg'
	}
]
