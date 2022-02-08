import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema:UserSchema}])],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}