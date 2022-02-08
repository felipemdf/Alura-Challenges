import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){};


    async findOne(userName: string){
        const user = await this.userModel.findOne({
            userName: userName
        }).exec();

        return user;
    }

    async createUser(newUser: User){
        const user = new this.userModel(newUser);
        return await user.save(); 
    }

}
