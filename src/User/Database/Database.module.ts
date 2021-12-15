import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mihir',
      password: 'ubuntu',
      database: 'form',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DataMysqlModule {}
