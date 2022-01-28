import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verificador } from 'src/utils/verificador';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa, DespesaDocument } from './entities/despesa.entity';

@Injectable()
export class DespesasService {
  constructor(@InjectModel(Despesa.name) private despesaModel: Model<DespesaDocument>){}

  async create(createDespesaDto: CreateDespesaDto) {
   //Verificar quantos dados repetidos dentro do mês
   let dadosRepetidos = Verificador.verificarRepeticao(this.despesaModel, createDespesaDto);

   // Se existir uma receita com a mesma descrição no mesmo mês, não cadastra a nova receita
   if (await dadosRepetidos > 0){
     return {message: "Não é possivel criar uma despesa com esta descrição, pois já existe uma neste mês!"}
   }

   //Se não existir uma receita com a mesma descrição no mês, então cria outra
   const createdDespesa = new this.despesaModel(createDespesaDto);
   const despesa = createdDespesa.save();
   
   return despesa;
  }

  findAll() {
    const despesas = this.despesaModel.find().exec();
    return despesas;
  }

  async findOne(id: string) {
    if(!Verificador.verificadorId(id)){return {mensagem: `O Id não é válido`}}

    const despesa = await this.despesaModel.findById(id).exec();

    if (!despesa){return {mensagem: `Não existe a despesa #${id}!`}}

    return despesa;
  }

  async update(id: string, updateDespesaDto: UpdateDespesaDto) {
    //Verificar quantos dados repetidos dentro do mês
    let dadosRepetidos = Verificador.verificarRepeticao(this.despesaModel, updateDespesaDto);

    // Se existir uma despesa com a mesma descrição no mesmo mês, não cadastra a nova receita
    if (await dadosRepetidos > 0){
      return {message: "Não é possivel criar uma despesa com esta descrição, pois já existe uma neste mês!"}
    }
    
    //Se não existir uma despesa com a mesma descrição no mês, então cria outra
    this.despesaModel.findByIdAndUpdate(id, updateDespesaDto).exec();
  
    //Tive que realizar a busca novamente pois estava me retornando o valor antes de atualizar por causa do async
    let updatedDespesa = await this.despesaModel.findById(id);

    return updatedDespesa
  }

  async remove(id: string) {
    if(!Verificador.verificadorId(id)){return {mensagem: `O Id não é válido`}}

    const despesa = await this.despesaModel.findByIdAndDelete(id).exec();

    if (!despesa){return {mensagem: `Não existe a despesa #${id}!`}}

    return despesa;
  }
}
