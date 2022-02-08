import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ResumosService } from './resumos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('resumos')
export class ResumosController {
  constructor(private readonly resumosService: ResumosService) {}

  @Get()
  resumoMensal(
    @Query('mes') mes: string,
    @Query('ano') ano: string
  ) {
    return this.resumosService.generate(mes, ano);
  }
}
