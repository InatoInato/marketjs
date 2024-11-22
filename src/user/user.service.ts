import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './model/users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo: Repository<Users>
    ){}

    async getAllUsers(): Promise<Users[]>{
        return this.usersRepo.find();
    }

    async getUserById(id: number): Promise<Users>{
        const user = await this.usersRepo.findOne({where: {id}});
        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async createUser(userDto: UserDto): Promise<any>{
        if(!userDto.password){
            throw new Error("Password requirement!");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        
        const user = this.usersRepo.create({
            ...userDto,
            password: hashedPassword,
        })
        await this.usersRepo.save(user);
        return user;
    }

    async validateUser(email: string, password: string): Promise<Users | null>{
        const user = await this.usersRepo.findOne({where: {email}});
        if(!user){
            console.log("User not found!", email);
            return null;
        }

        if(!password){
            console.error("User is missing!", user);
            return null;
        }

        try{
            const isValidPass = await bcrypt.compare(password, user.password);
            if(isValidPass){
                return user;
            } else{
                console.log("Invalid password!", user.email);
            }
        } catch(e){
            console.error("Error?!: ", e);
        }
        return null;
    }
}
