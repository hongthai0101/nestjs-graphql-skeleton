import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DB_URL,
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  password: process.env.DB_PASS,
  name: process.env.DB_NAME,
  username: process.env.DB_USER,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DB_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DB_CA,
  key: process.env.DB_KEY,
  cert: process.env.DB_CERT,
}));
