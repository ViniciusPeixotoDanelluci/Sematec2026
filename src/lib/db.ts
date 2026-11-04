import Database from 'better-sqlite3'
import { dbPath } from './db-path.ts'

const db = new Database(dbPath)

export default db
