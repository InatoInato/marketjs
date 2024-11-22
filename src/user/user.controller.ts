import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(): {message: string}{
    return {message: "Protected route!!!"};
  }

  @Get()
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: number){
    return await this.userService.getUserById(id);
  }
}
