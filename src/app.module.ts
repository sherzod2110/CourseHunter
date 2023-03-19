import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { connectDb } from './ormconfig/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TakeModule } from './module/take/take.module';
import { CategoriesModule } from './module/categories/categories.module';
import { AuthGoogleModule } from './module/auth_google/auth_google.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    TakeModule,
    CategoriesModule,
    AuthGoogleModule,
  ],
})
export class AppModule {}
