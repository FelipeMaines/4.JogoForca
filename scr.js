class JogoForca {
    inputChute = document.getElementById('input-chute');
    btnChute = document.getElementById('btn-chute'); 
    btnResetar = document.getElementById('btnResetar');
    palavraMostrada = document.querySelector('.palavraMostrada');
    img = document.getElementById('img-id');

    letrasUsadas = [''];
    mensagem = '';
    NumeroTentativas = 5;
    TentativaAtual = 0;
    PalavraSorteada = '';
    ListaPalavras = [
        "ABACATE", "ABACAXI", "ACEROLA", "AÇAÍ", "ARAÇA", "ABACATE", "BACABA",
        "BACURI", "BANANA", "CAJÁ", "CAJÚ", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA",
        "GOIABA", "JABUTICABA", "JENIPAPO", "MAÇÃ", "MANGABA", "MANGA",
        "MARACUJÁ", "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI",
        "TANGERINA", "UMBU", "UVA", "UVAIA"
      ];

    constructor(){
        this.RegistrarEventos();
        this.PalavraSorteada = this.SorterPalavra();
        this.ArrumarPalavraMostrada();
        this.TentativaAtual = 0;
        console.log(this.PalavraSorteada);
    }

    ArrumarPalavraMostrada(){
        this.palavraMostrada.textContent = Array(this.PalavraSorteada.length).fill("_").join(" ");
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
    this.img.setAttribute('src', 'Img/1.png');
    this.PalavraSorteada = this.SorterPalavra();
    this.ArrumarPalavraMostrada();
    this.btnChute.removeAttribute('disabled');

    const panel = document.getElementById('pnlJogoId');
    panel.querySelector('h2')?.remove();
    panel.querySelector('h3')?.remove();

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
                this.AtualizarPalavraMostrada(i, this.PalavraSorteada[i]);
        }
    }
    else{
        this.TentativaAtual++;

        if(this.TentativaAtual == 6)
            return

        this.letrasUsadas.push(this.inputChute.value);
        this.img.setAttribute('src', `Img/${this.TentativaAtual + 1}.png`);

        const panel = document.getElementById('pnlJogoId');

        panel.querySelector('h3')?.remove();

        const txtLetrasUsadas = document.createElement('h3');

        txtLetrasUsadas.textContent = this.letrasUsadas.join(" ");
        txtLetrasUsadas.classList.add('notificacao-erro');

        panel.appendChild(txtLetrasUsadas);
    }

    this.inputChute.value = '';

    if(this.VerificarResultado()){

        const panel = document.getElementById('pnlJogoId');

        const txtNotificacao = document.createElement('h2');
        txtNotificacao.textContent = this.mensagem;

        if(this.mensagem == "Voce Perdeu!"){
            txtNotificacao.classList.remove('notificacao-acerto');
            txtNotificacao.classList.add('notificacao-erro')
            this.btnChute.setAttribute('disabled', '');
        }

        else{
            txtNotificacao.classList.add('notificacao-acerto');
            txtNotificacao.classList.remove('notificacao-erro')
        }

        panel.querySelector('h2')?.remove();

        panel.appendChild(txtNotificacao);
    }

}

   normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

   AtualizarPalavraMostrada(index, value){
    let palavraArray = this.palavraMostrada.textContent.split(' ');
    palavraArray[index] = value;
    this.palavraMostrada.textContent = palavraArray.join(' ');
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
   }
}

window.addEventListener('load', () => new JogoForca());
