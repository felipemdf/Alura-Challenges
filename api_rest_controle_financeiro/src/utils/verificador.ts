import { Model, Types } from "mongoose";


export class Verificador {
    static async verificarRepeticao(model: Model<any>, Dto: any){
        let dataDto = new Date(Dto.data);
        let anoDto = dataDto.getFullYear().toString();
        let mesDto = (dataDto.getMonth() + 1).toString();
        mesDto = (mesDto.length == 1) ? mesDto = '0' + mesDto : mesDto = mesDto + "";

        const dadosRepetidos = model.find({
            data: { $gte: `${anoDto}-${mesDto}-01`, $lte: `${anoDto}-${mesDto}-31`},
            descricao: Dto.descricao
          }).exec();
        
        //  console.log((await dadosRepetidos).toString());
        
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