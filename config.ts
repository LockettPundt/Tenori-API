import * as dotenv from "dotenv";
dotenv.config();

const DB_URI: string = process.env.DB_URI || ''
const DB_NAME: string = process.env.DB_NAME || ''
const EMAIL: string = process.env.EMAIL || ''
const EMAIL_PW: string = process.env.EMAIL_PW || ''
const PORT: string = process.env.PORT || '3000'

export { DB_NAME, DB_URI, EMAIL, EMAIL_PW, PORT }