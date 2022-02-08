import { Module } from '@nestjs/common';
import { ResumosService } from './resumos.service';
import { ResumosController } from './resumos.controller';
import { DespesasService } from 'src/despesas/despesas.service';
import { ReceitasService } from 'src/receitas/receitas.service';
import { DespesasModule } from 'src/despesas/despesas.module';
import { ReceitasModule } from 'src/receitas/receitas.module';

@Module({
  imports: [DespesasModule, ReceitasModule],
  controllers: [ResumosController],
  providers: [ResumosService],
})
export class ResumosModule {}
