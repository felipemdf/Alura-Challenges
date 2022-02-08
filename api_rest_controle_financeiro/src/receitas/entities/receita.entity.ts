import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';

export type ReceitaDocument = Receita & Document

@Schema()
export class Receita {

    @Prop({required: true, lowercase: true})
    descricao: String;

    @Prop({required: true})
    valor: Number;

    @Prop({required: true})
    data: Date;
    
    @Prop({default: Date.now})
    dataCriacao: Date;

    @Prop({default: Date.now})
    dataAtualizacao: Date;


    constructor(receita?: Partial<Receita>){
        this.descricao = receita?.descricao;
        this.valor = receita?.valor;
        this.data = receita?.data;
        this.dataCriacao = receita?.dataCriacao;
        this.dataAtualizacao = receita?.dataAtualizacao;
    }
}


export const ReceitaSchema = SchemaFactory.createForClass(Receita);