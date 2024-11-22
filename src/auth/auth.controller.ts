import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/userDto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: {email: string, password: string}){
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() userDto: UserDto){
    return this.authService.register(userDto);
  }
}
