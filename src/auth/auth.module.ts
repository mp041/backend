import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from '../User/Database/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../User/user.module';


// import { SessionSerializer } from './session.serializer';


@Module({
  imports : [ UserModule,TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({
    secret : 'SECRET',
    signOptions : { expiresIn: '36000s'}
  })],
  providers: [AuthService, LocalStrategy,JwtStrategy,UserService],
  exports : [AuthService]

})
export class AuthModule {}




// imports : [UsersService, PassportModule.register({session:true})],
// providers: [AuthService, LocalStrategy,UsersService,SessionSerializer]
