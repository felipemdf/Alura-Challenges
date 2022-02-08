export class CreateResumoDto {
    contrutor(){}
    valor_total_receitas: number = 0;
    valor_total_despesas: number = 0;
    saldo_final: number = 0;
    valor_gasto_alimentacao: number = 0;
    valor_gasto_saude: number = 0;
    valor_gasto_moradia: number = 0;
    valor_gasto_transporte: number = 0;
    valor_gasto_educacao: number = 0;
    valor_gasto_lazer: number = 0;
    valor_gasto_imprevistos: number = 0;
    valor_gasto_outros: number = 0;

    
    
    public set_valor_gasto_alimentacao(v : number) {
        this.valor_gasto_alimentacao += v;
    }

    public set_valor_gasto_saude(v : number) {
        this.valor_gasto_saude += v;
    }

    public set_valor_gasto_moradia(v : number) {
        this.valor_gasto_moradia += v;
    }

    public set_valor_gasto_transporte(v : number) {
        this.valor_gasto_transporte += v;
    }

    public set_valor_gasto_educacao(v : number) {
        this.valor_gasto_educacao += v;
    }

    public set_valor_gasto_lazer(v : number) {
        this.valor_gasto_lazer += v;
    }

    public set_valor_gasto_imprevistos(v : number) {
        this.valor_gasto_imprevistos += v;
    }

    public set_valor_gasto_outros(v : number) {
        this.valor_gasto_outros += v;
    }
}
