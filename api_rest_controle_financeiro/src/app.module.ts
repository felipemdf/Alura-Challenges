import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceitasModule } from './receitas/receitas.module';
import { DespesasModule } from './despesas/despesas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumosModule } from './resumos/resumos.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://developer:162001@cluster01.xvcih.mongodb.net/controleorcamental?retryWrites=true&w=majority'),
    ReceitasModule, 
    DespesasModule, 
    ResumosModule, 
    AuthModule, 
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthModule],
})

export class AppModule {}
