import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/userDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async login(email: string, password: string): Promise<{access_token: string}>{
        const user = await this.userService.validateUser(email, password);
        if(!user){
            throw new UnauthorizedException("Incorrect email or password!");
        }

        const payload = {email: user.email, sub: user.id};
        const access_token = this.jwtService.sign(payload);
        return {access_token};
    }

    async register(userDto: UserDto): Promise<{message: string}>{
        await this.userService.createUser(userDto);
        return {message: "Registration successful!"};
    }
}
