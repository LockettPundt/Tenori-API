import { DB_NAME_LOCAL, DB_PASSWORD, DB_USERNAME, DB_PRODUCTION_URL, DATABASE_URL } from './config'
import { Setting } from './src/entity/Setting'

const isDev = process.env.NODE_ENV === 'development'

export = {
   type: "postgres",
   port: 5432,
   url: isDev ? undefined : DATABASE_URL,
   host: isDev ? 'localhost' : undefined,
   database: isDev ? DB_NAME_LOCAL : undefined,
   ssl: !isDev ? {
      rejectUnauthorized: false,
   } : undefined,
   entities: [
      Setting
   ],
   migrations: [
      "src/migration/**/*.{ts,js}"
   ],
   subscribers: [
      "src/subscriber/**/*.{ts,js}"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   },
   synchronize: true,
   logging: false
}