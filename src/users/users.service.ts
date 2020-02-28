import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll() {
    const users = await this.userRepository.find({
      where: { active: true },
    });

    return users.map(user => user.toResponseObject());
  }

  async showOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.toResponseObject();
  }

  async register(data: UserDTO) {
    const { email } = data;

    let user = await this.userRepository.findOne({
      where: { email, active: true },
    });

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    // Send email

    return user.toResponseObject();
  }

  async edit(id: string, data: Partial<UserDTO>) {
    let user = await this.userRepository.findOne({
      where: { id, active: true },
    });

    if (data.email) {
      const userByEmail = await this.userRepository.findOne({
        where: { email: data.email, active: true },
      });

      if (userByEmail && user.id !== userByEmail.id) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update({ id: user.id }, data);
    user = await this.userRepository.findOne({
      where: { id, active: true },
    });

    // Send email

    return user.toResponseObject();
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
    });
    await this.userRepository.update({ id: user.id }, { active: false });

    // Send email

    return user.toResponseObject();
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { email, active: true },
    });

    if (user && (await user.comparePassword(pass))) {
      return user.toResponseObject();
    }

    return null;
  }
}
