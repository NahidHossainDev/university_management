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
  jwt: {
    access_secret_key: process.env.JWT_ACCESS_SECRET,
    access_secret_expirity: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_secret_expirity: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
  },
  redisURL: process.env.REDIS_URL,
  redisExpireIn: process.env.REDIS_EXPIRE_IN,
  authService: process.env.AUTH_SERVICE,
  coreService: process.env.CORE_SERVICE,
};

export default config;
