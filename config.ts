import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME_LOCAL: string = process.env.DB_NAME_LOCAL || ''
const PORT: string = process.env.PORT || '3000'
const DB_PASSWORD: string = process.env.DB_PASSWORD || ''
const NODE_ENV: string = process.env.NODE_ENV || 'development'
const DB_USERNAME: string = process.env.DB_USERNAME || ''
const DB_PRODUCTION_URL: string = process.env.DB_PRODUCTION_URL || ''
const DATABASE_URL: string = process.env.DATABASE_URL || ''

export { DB_NAME_LOCAL, PORT, NODE_ENV, DB_PASSWORD, DB_USERNAME, DB_PRODUCTION_URL, DATABASE_URL }