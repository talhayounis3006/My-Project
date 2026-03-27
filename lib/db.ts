import path from 'path'
import fs from 'fs'
import sqlite3 from 'sqlite3'
import { Pool } from 'pg'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'balkan.sqlite')

let _sqliteDb: sqlite3.Database | null = null
let _pgPool: Pool | null = null

function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true })
}

const isPostgres = !!process.env.POSTGRES_URL || !!process.env.DATABASE_URL
const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL

export function getDb() {
  if (isPostgres) {
    if (!_pgPool) {
      _pgPool = new Pool({
        connectionString: postgresUrl,
        ssl: { rejectUnauthorized: false }
      })
    }
    return _pgPool
  }

  ensureDbDir()
  if (_sqliteDb) return _sqliteDb
  _sqliteDb = new sqlite3.Database(DB_PATH)
  return _sqliteDb
}

export async function initDb() {
  const db = getDb()
  const dbType = isPostgres ? 'pg' : 'sqlite'

  const idType = dbType === 'pg' ? 'SERIAL' : 'INTEGER'
  const primaryKey = dbType === 'pg' ? 'PRIMARY KEY' : 'PRIMARY KEY AUTOINCREMENT'
  const now = dbType === 'pg' ? 'CURRENT_TIMESTAMP' : "datetime('now')"

  await run(
    db,
    `CREATE TABLE IF NOT EXISTS users (
      id ${idType} ${primaryKey},
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (${now})
    )`
  )
  await run(
    db,
    `CREATE TABLE IF NOT EXISTS cart_items (
      id ${idType} ${primaryKey},
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (${now}),
      UNIQUE(user_id, product_id)
    )`
  )
  await run(
    db,
    `CREATE TABLE IF NOT EXISTS contact_messages (
      id ${idType} ${primaryKey},
      user_id INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (${now})
    )`
  )
}

function convertSql(sql: string) {
  if (!isPostgres) return sql
  let i = 1
  return sql.replace(/\?/g, () => `$${i++}`)
}

export async function run(db: sqlite3.Database | Pool, sql: string, params: unknown[] = []) {
  if (isPostgres) {
    await (db as Pool).query(convertSql(sql), params)
    return
  }
  return new Promise<void>((resolve, reject) => {
    ;(db as sqlite3.Database).run(sql, params as unknown[], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

export async function get<T>(db: sqlite3.Database | Pool, sql: string, params: unknown[] = []) {
  if (isPostgres) {
    const res = await (db as Pool).query(convertSql(sql), params)
    return res.rows[0] as T | undefined
  }
  return new Promise<T | undefined>((resolve, reject) => {
    ;(db as sqlite3.Database).get(sql, params as unknown[], (err, row) => {
      if (err) reject(err)
      else resolve(row as T | undefined)
    })
  })
}

export async function all<T>(db: sqlite3.Database | Pool, sql: string, params: unknown[] = []) {
  if (isPostgres) {
    const res = await (db as Pool).query(convertSql(sql), params)
    return (res.rows || []) as T[]
  }
  return new Promise<T[]>((resolve, reject) => {
    ;(db as sqlite3.Database).all(sql, params as unknown[], (err, rows) => {
      if (err) reject(err)
      else resolve((rows || []) as T[])
    })
  })
}

