import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite3.db',
      entities: ['**/*.entity.js'],
      synchronize: true,
    }),
    MoviesModule,
  ],
  // controllers: [MoviesController],
  // providers: [MoviesService],
})
export class AppModule {}
