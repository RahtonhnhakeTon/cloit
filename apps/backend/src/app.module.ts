import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusModule } from './menus/menus.module';
import DatabaseConfiguration from '../../../libs/shared/config/database.config';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [MenusModule,
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env', '.development.env'],
    load: [
      DatabaseConfiguration,
    ]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
