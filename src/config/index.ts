/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const config = {
  db_url: process.env.MONGODB_URI,
  port: process.env.PORT,
  defaultStudentPass: process.env.DEFAULT_STUDENT_PASS,
}

export default config
