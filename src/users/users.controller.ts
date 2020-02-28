import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserDTO } from './user.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/users')
  showAllUsers() {
    return this.usersService.showAll();
  }

  @Get('/users/:id')
  showOneUser(@Param('id') id: string) {
    return this.usersService.showOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/whoami')
  showMe(@User('id') id: string) {
    return this.usersService.showOne(id);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.usersService.register(data);
  }

  @Put('/users')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  editUser(@User('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.usersService.edit(id, data);
  }

  @Delete('/users')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteUser(@User('id') id: string) {
    return this.usersService.delete(id);
  }
}
