import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DataMysqlModule} from './User/Database/Database.module';
import {UserModule} from './User/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DataMysqlModule,UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
