export class GeradorData{
    static ultimoDiaMes(){
        var data = new Date();
        const anoAtual = data.getFullYear();
        const mesAtual = data.getMonth();
        
        const ultimoDia =  new Date(anoAtual, mesAtual +1, 0).getDate();
        return {ultimoDia, mesAtual, anoAtual}
    }
}