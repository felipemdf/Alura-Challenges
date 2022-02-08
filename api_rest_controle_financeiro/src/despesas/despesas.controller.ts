import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@UseGuards(JwtAuthGuard)
@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  create(@Body() createDespesaDto: CreateDespesaDto) {
    return this.despesasService.create(createDespesaDto);
  }

  @Get()
  find(
    @Query('descricao') descricao: string,
    @Query('mes') mes: string,
    @Query('ano') ano: string
  ) {
    
    if(descricao){ return this.despesasService.findByDescricao(descricao);}
    else if(mes){ return this.despesasService.findByData(mes, ano);}

    return this.despesasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despesasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    return this.despesasService.update(id, updateDespesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despesasService.remove(id);
  }
}
