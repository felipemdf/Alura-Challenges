import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService){}

    async validadeUser(username: string, password: string){
        const user = await this.userService.findOne(username);

        if(user && user.password == password){
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: any){
        const payLoad = { username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payLoad),
        };
    }

    async register(newUser: User){
        return this.userService.createUser(newUser);
    }
}
