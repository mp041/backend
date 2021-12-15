import { Injectable,NotFoundException,HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '';
// import { UsersService } from '../users/users.service';
import { UserService } from '../User/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }



  async validateUser(email: string, password: string): Promise<any> {

    console.log("validate user at auth service")
    const user = await this.userService.getCustomer(email);


    console.log(user,"not found")
    if(user.length === 0){

      throw new NotFoundException('user not found');

    }

    // console.log(user, "AuthService")

    console.log(user[0].password)
    const isMatch = await bcrypt.compare(password, user[0].password);
    // console.log(isMatch,"compareeeeeeeeeeeeeeeeeeeeee")

    if (user && isMatch) {
      // console.log("user email got")
      const { password, ...rest } = user[0];
      console.log(rest)
      return rest;
    }

    return null;
  }








  async login(user: any) {
    console.log(user, "token time user")

    const payload = { firstname: user.firstName, lastname: user.lastName, email: user.email, sub: user.id };

    // console.log("token before generate");

    return {
      statusCode : HttpStatus.CREATED,
      message : 'User Login Success',
      access_token: this.jwtService.sign(payload),
    }
  }


}
