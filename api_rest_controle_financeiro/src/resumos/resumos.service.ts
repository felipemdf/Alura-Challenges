import { Injectable } from '@nestjs/common';
import { DespesasService } from 'src/despesas/despesas.service';
import { ReceitasService } from 'src/receitas/receitas.service';
import { CreateResumoDto } from './dto/resumo.dto';


@Injectable()
export class ResumosService {
  constructor(
    private depesasService: DespesasService,
    private receitasService: ReceitasService
  ){}


  async generate(mes: string, ano: string) {
    let resumoDto = new CreateResumoDto();
    let relacionamentoCategorias = {
      "alimentação" : resumoDto.set_valor_gasto_alimentacao.bind(resumoDto),
      "saúde"       : resumoDto.set_valor_gasto_saude.bind(resumoDto),
      "moradia"     : resumoDto.set_valor_gasto_moradia.bind(resumoDto),
      "transporte"  : resumoDto.set_valor_gasto_transporte.bind(resumoDto),
      "educação"    : resumoDto.set_valor_gasto_educacao.bind(resumoDto),
      "lazer"       : resumoDto.set_valor_gasto_lazer.bind(resumoDto),
      "imprevistos" : resumoDto.set_valor_gasto_imprevistos.bind(resumoDto),
      "outros"      : resumoDto.set_valor_gasto_outros.bind(resumoDto),
    }
    let relacionamentosKeys = Object.keys(relacionamentoCategorias);
      
    let receitas = this.receitasService.findByData(mes, ano);
    let arrayReceitas = Object.values(await receitas);
  
    //RECEITA PODE USAR REDUCE AQUI
    resumoDto.valor_total_receitas = arrayReceitas.reduce((acumulador, valorAtual) => {
      let resultado: number = parseFloat((acumulador + valorAtual.valor).toFixed(2));
      return (resultado);      
    }, 0)
    resumoDto.saldo_final += resumoDto.valor_total_receitas;


    //RESUMO RELACIONADO AS DESPESAS
    let despesas = this.depesasService.findByData(mes, ano);
    let arrayDespesas = Object.values(await despesas);

    arrayDespesas.forEach(despesa => {

      //TOTAL DE DESPESAS NO MÊS
      resumoDto.valor_total_despesas += despesa.valor;

      //DESPESAS NO MÊS POR CATEGORIA
      relacionamentosKeys.map((key) => {
        if(key == despesa.categoria){ 
          relacionamentoCategorias[key](despesa.valor);
        }
      });
    
    });    

    resumoDto.saldo_final = parseFloat((resumoDto.valor_total_receitas + resumoDto.valor_total_despesas).toFixed(2));

    return resumoDto;
    
  }

}
