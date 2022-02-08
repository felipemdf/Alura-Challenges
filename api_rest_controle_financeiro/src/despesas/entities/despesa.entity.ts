import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DespesaDocument = Despesa & Document

@Schema()
export class Despesa {

    @Prop({required: true, lowercase: true})
    descricao: String;

    @Prop({required: true})
    valor: Number;

    @Prop({lowercase: true, default: 'outros', enum: ['alimentação', 'saúde', 'moradia', 'transporte', 'educação', 'lazer', 'imprevistos', 'outros']})
    categoria: String;

    @Prop({required: true})
    data: Date;

    @Prop({default: Date.now})
    dataCriacao: Date;

    @Prop({default: Date.now})
    dataAtualizacao: Date;

}

export const DespesaSchema = SchemaFactory.createForClass(Despesa);
