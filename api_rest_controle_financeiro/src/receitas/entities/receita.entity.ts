import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';

export type ReceitaDocument = Receita & Document

@Schema()
export class Receita {

    @Prop({required: true, lowercase: true})
    descricao: String;

    @Prop({required: true})
    valor: Number;

    @Prop({default: Date.now})
    dataCriacao: Date;

    @Prop({default: Date.now})
    dataAtualizacao: Date;

}


export const ReceitaSchema = SchemaFactory.createForClass(Receita);