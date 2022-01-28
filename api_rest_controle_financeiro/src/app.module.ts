import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceitasModule } from './receitas/receitas.module';
import { DespesasModule } from './despesas/despesas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://developer:162001@cluster01.xvcih.mongodb.net/controleorcamental?retryWrites=true&w=majority'),
    ReceitasModule, 
    DespesasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
