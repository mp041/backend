import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Database/entity/user.entity';
import { UserDto } from './dto/index';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async listUsers(): Promise<User[]> {
    return this.userRepo.find({});
  }


  public async getUsersById(id: string): Promise<any> {
    const data = await this.userRepo.findOne(id);

    return await this.userRepo.find(data);
  }



  public async getCustomer(email: string): Promise<any> {
    console.log(email);
    const data = await this.userRepo.find({ email });
    // console.log(data);
    if (!email) {
      throw new NotFoundException('user Not Found');
    }
    return data;
    //     console.log(email)
    //     if(!data){
    //         throw new NotFoundException('user not found');
    //     }
    //     return data;
  }

  public async createUser(data: UserDto): Promise<any> {


    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(data.password, saltOrRounds);


      console.log(hash,"hasshhhhhhhhhhhh")
      const email = data.email;

      if (email) {
        const edata = await this.userRepo.find({ email });

        if (edata.length === 0) {
          const person = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hash,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
          };

          const user = this.userRepo.create(person);
          await this.userRepo.save(user);

          return user;
        } else {
          console.log('founddddddd');

          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'User is already Exist!!!!',
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updateUser(id: string, data: UserDto): Promise<any> {
    const update = this.userRepo.update(id, data);
    const dataNew = await this.userRepo.findOne(id);
    console.log(update);

    return await this.userRepo.find(dataNew);
  }

  public async deleteUser(id: string): Promise<any> {
    const data = await this.userRepo.findOne(id);

    if (!data) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepo.remove(data);
  }
}
