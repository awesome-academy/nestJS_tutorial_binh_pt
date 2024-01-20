import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/entities/*.entity.js'],
  synchronize: true,
  logging: true,
};

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: 3600,
  },
}
