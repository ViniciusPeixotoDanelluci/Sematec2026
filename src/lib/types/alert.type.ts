import { ObstacleType } from './obstacle-type'
import { AlertStatus } from './alert-status.type'

export type Alert = {
	id: number
	title: string
	description: string
	category: ObstacleType
	neighborhood: string
	street: string
	status: AlertStatus
	created_at: string
	latitude: number
	longitude: number
}
