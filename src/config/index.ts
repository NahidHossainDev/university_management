import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  env: process.env.NODE_ENV,
  db_url: process.env.MONGODB_URI,
  port: process.env.PORT,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};

export default config;
