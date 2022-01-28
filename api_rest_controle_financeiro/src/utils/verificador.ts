import { Model, Types } from "mongoose";
import { CreateReceitaDto } from "src/receitas/dto/create-receita.dto";
import { UpdateReceitaDto } from "src/receitas/dto/update-receita.dto";
import { ReceitaDocument } from "src/receitas/entities/receita.entity";

export class Verificador {
    dataAtual: Date;
    anoAtual: String;
    mesAtual: String;
    receitaModel: Model<ReceitaDocument>;
    createReceitaDto: CreateReceitaDto;
    numeroRepetições: number;

    static async verificarRepeticao(model: Model<any>, Dto: any){
        let dataAtual = new Date();
        let anoAtual = dataAtual.getFullYear().toString();
        let mesAtual = (dataAtual.getMonth() + 1).toString();
        mesAtual = (mesAtual.length == 1) ? mesAtual = '0' + mesAtual : mesAtual = mesAtual + "";

        const dadosRepetidos = model.find({
            dataCriacao: { $gte: `${anoAtual}-${mesAtual}-01`, $lte: `${anoAtual}-${mesAtual}-31`},
            descricao: Dto.descricao
          }).exec();

        let numeroRepetições = (await dadosRepetidos).length;

        return numeroRepetições;
    }

    static verificadorId(id: string){
        if(!Types.ObjectId.isValid(id)){
            return false;
        }

        return true;
    }
}