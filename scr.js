import { ViewJs } from "./View.js";

class JogoForca {
    inputChute = document.getElementById('input-chute');
    btnChute = document.getElementById('btn-chute'); 
    btnResetar = document.getElementById('btnResetar');
    palavraMostrada = document.querySelector('.palavraMostrada');

    letrasUsadas = [];
    mensagem = '';
    NumeroTentativas = 5;
    TentativaAtual = 0;
    PalavraSorteada = '';
    view;

    ListaPalavras = [
        "ABACATE", "ABACAXI", "ACEROLA", "AÇAÍ", "ARAÇA", "ABACATE", "BACABA",
        "BACURI", "BANANA", "CAJÁ", "CAJÚ", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA",
        "GOIABA", "JABUTICABA", "JENIPAPO", "MAÇÃ", "MANGABA", "MANGA",
        "MARACUJÁ", "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI",
        "TANGERINA", "UMBU", "UVA", "UVAIA"
      ];

    constructor(){
        this.view = new ViewJs();
        this.RegistrarEventos();
        this.PalavraSorteada = this.SorterPalavra();
        this.view.ArrumarPalavraMostrada(this.PalavraSorteada);
        this.TentativaAtual = 0;
        console.log(this.PalavraSorteada);
    }

    
   
   RegistrarEventos(){
       this.inputChute.addEventListener('input',(e)=>{
           if(e.target.value.length > 1)
               e.target.value = e.target.value[e.target.value.length - 1]
       })

       this.btnChute.addEventListener('click', () => this.VerificarChute())

       this.btnResetar.addEventListener('click', () => this.Resetar());
   }

   Resetar(){
    this.TentativaAtual = 0;
    this.PalavraSorteada = this.SorterPalavra();
    this.letrasUsadas = [];
    this.btnChute.removeAttribute('disabled');
    this.view.ResetarJogo(this.PalavraSorteada);
   }

   VerificarChute(){

    const inputChuteNormalized = this.normalizeString(this.inputChute.value.toLowerCase());
    const palavraSorteadaNormalized = this.normalizeString(this.PalavraSorteada.toLowerCase());

    if(this.letrasUsadas.includes(inputChuteNormalized)){
        this.inputChute.value = '';
        return;
    }

    if(palavraSorteadaNormalized.includes(inputChuteNormalized))
    {
        for(let i = 0; i < this.PalavraSorteada.length; i++)
        { 
            if(this.normalizeString(this.PalavraSorteada[i].toLowerCase()) === inputChuteNormalized)
                this.view.AtualizarPalavraMostrada(i, this.PalavraSorteada[i]);
        }
    }
    else{
        this.TentativaAtual++;

        this.letrasUsadas.push(this.inputChute.value);

        this.view.ArrumarImagem(this.TentativaAtual, this.letrasUsadas);
    }

    this.inputChute.value = '';

    
    if(this.VerificarResultado())
    {
        this.btnChute.setAttribute('disabled', '');
        this.view.ArrumarTelaDependendoResultado(this.mensagem);
    }
}

   normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

   SorterPalavra(){
       let numeroSortado = Math.floor(Math.random() * this.ListaPalavras.length)
       return this.ListaPalavras[numeroSortado];
   }

   VerificarResultado(){
    if(this.TentativaAtual >= this.NumeroTentativas){

        this.mensagem = "Voce Perdeu!";
        return true
    }

    else if(this.palavraMostrada.textContent.replace(/ /g, '') == this.PalavraSorteada)
    {
        this.mensagem = "Voce Ganhou!";
        return true;
    }

    return false;
   }
}

window.addEventListener('load', () => new JogoForca());
