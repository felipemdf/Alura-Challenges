import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Query, UseGuards } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Post()
  create(@Body() createReceitaDto: CreateReceitaDto) {
    return this.receitasService.create(createReceitaDto);
  }

  //INFELIZMENTE DEU MUITO CONFLITO ENTRE A ROTA SEM PARAMETRO E COM PARAMETRO, TIVE QUE JUNTAR AS DUAS
  // O DECORATOR @Query AINDA É MEIO CONFUSO PARA MIM NO NEST.JS.
  @Get()
  find(
    @Query('descricao') descricao: string,
    @Query('mes') mes: string,
    @Query('ano') ano: string
    ) {
    if(descricao){ return this.receitasService.findByDescricao(descricao)}
    else if (mes){ return this.receitasService.findByData(mes, ano)}

    return this.receitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receitasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitasService.update(id, updateReceitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receitasService.remove(id);
  }
}
