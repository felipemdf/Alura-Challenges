import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verificador } from 'src/utils/verificador';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita, ReceitaDocument } from './entities/receita.entity';

@Injectable()
export class ReceitasService {
  constructor(@InjectModel(Receita.name) private receitaModel: Model<ReceitaDocument>){}

  async create(createReceitaDto: CreateReceitaDto) {

    //Verificar quantos dados repetidos dentro do mês
    let dadosRepetidos = Verificador.verificarRepeticao(this.receitaModel, createReceitaDto);

    // Se existir uma receita com a mesma descrição no mesmo mês, não cadastra a nova receita
    if (await dadosRepetidos > 0){
      return {message: "Não é possivel criar uma receita com esta descrição, pois já existe uma neste mês!"}
    }

    //Se não existir uma receita com a mesma descrição no mês, então cria outra
    const createdReceita = new this.receitaModel(createReceitaDto);
    const receita = createdReceita.save();
    
    return receita;
  }

  findAll(): Promise<Receita[]>{
    const receitas = this.receitaModel.find().exec();
    return receitas;
  }

  async findOne(id: string) {
    if(!Verificador.verificadorId(id)){return {mensagem: `O Id não é válido`}}

    const receita = await this.receitaModel.findById(id).exec();

    if (!receita){return {mensagem: `Não existe a receita #${id}!`}}

    return receita;
  }

  async update(id: string, updateReceitaDto: UpdateReceitaDto) {
    //Verificar quantos dados repetidos dentro do mês
    let dadosRepetidos = Verificador.verificarRepeticao(this.receitaModel, updateReceitaDto);

    // Se existir uma receita com a mesma descrição no mesmo mês, não cadastra a nova receita
    if (await dadosRepetidos > 0){
      return {message: "Não é possivel criar uma receita com esta descrição, pois já existe uma neste mês!"}
    }
    
    //Se não existir uma receita com a mesma descrição no mês, então cria outra
    this.receitaModel.findByIdAndUpdate(id, updateReceitaDto).exec();
  
    //Tive que realizar a busca novamente pois estava me retornando o valor antes de atualizar por causa do async
    let updatedReceita = await this.receitaModel.findById(id);

    return updatedReceita
  }

  async remove(id: string) {
    if(!Verificador.verificadorId(id)){return {mensagem: `O Id não é válido`}}

    const receita = await this.receitaModel.findByIdAndDelete(id).exec();

    if (!receita){return {mensagem: `Não existe a receita #${id}!`}}

    return receita;
  }
}
