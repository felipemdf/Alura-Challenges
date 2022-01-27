import { Module } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { DespesasController } from './despesas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Despesa, DespesaSchema } from './entities/despesa.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Despesa.name, schema: DespesaSchema}])],
  controllers: [DespesasController],
  providers: [DespesasService]
})
export class DespesasModule {}
