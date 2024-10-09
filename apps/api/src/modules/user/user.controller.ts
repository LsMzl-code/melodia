import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Utilisateurs')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //*** GET ALL USERS ***//
  @Get()
  getAllUsers() {
      return this.userService.getUsers();
  }

  //*** GET USER BY ID ***//
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUser(id);
  }

  //*** UPDATE USER ***//
  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }



  //*** DELETE USER***//
  // @Delete('/delete/:id')
  // deleteUser(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.deleteUser(id);
  // }
}
