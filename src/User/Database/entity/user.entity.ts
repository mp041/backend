import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phone: string;

}
