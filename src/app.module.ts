import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './app.constant';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang']),
        AcceptLanguageResolver,
      ],
    }),
    TypeOrmModule.forRoot(ORM_CONFIG),
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
