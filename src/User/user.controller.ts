import { Controller, Get,Res,Param,Body,Post,HttpStatus,Put,Delete, ValidationPipe,UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import {UserDto} from './dto/index';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers(@Res() res:Response){
    const data = await this.userService.listUsers();
    res.status(200).send({
      statusCode: HttpStatus.OK,
      message: 'All Users',
      data
    });
  }

  @Get('/:customeId')
  async getUsersById(@Res() res:Response, @Param('customeId') id:string){
    const data = await this.userService.getUsersById(id);
    res.status(200).send({
      statusCode: HttpStatus.OK,
      message: 'User Getting success',
      data
    });
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  async createUser(@Res() res:Response, @Body() user: UserDto) {
    const data = await this.userService.createUser(user);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User Created Success',
      data
    });
  }

  @Put('/:customeId')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('customeId') id:string, @Body() user: UserDto) {
    const data = await this.userService.updateUser(id, user);
    console.log(data);
    return {
      status: HttpStatus.OK,
      message : 'User updated successfully',
      data
    }
  }

  @Delete('/:customeId')
  async deleteUser(@Param('customeId') id:string, @Res() res: Response) {
    const data = await this.userService.deleteUser(id)
    res.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'User Deleted Success',
      data
    });
  }
}
