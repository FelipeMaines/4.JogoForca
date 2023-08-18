export class ViewJs {

    inputChute = document.getElementById('input-chute');
    palavraMostrada = document.querySelector('.palavraMostrada');
    img = document.getElementById('img-id');

    ArrumarTelaDependendoResultado(mensagem) {
    
            const panel = document.getElementById('pnlJogoId');
    
            const txtNotificacao = document.createElement('h2');
            txtNotificacao.textContent = mensagem;
    
            if (mensagem == "Voce Perdeu!") {
                txtNotificacao.classList.remove('notificacao-acerto');
                txtNotificacao.classList.add('notificacao-erro');
                
            }
    
            else {
                txtNotificacao.classList.add('notificacao-acerto');
                txtNotificacao.classList.remove('notificacao-erro');
            }
    
            panel.querySelector('h2')?.remove();
    
            panel.appendChild(txtNotificacao);
    }

    ArrumarImagem(NumeroTentativa, letrasUsadas){

        if(NumeroTentativa == 6)
            return

        this.img.setAttribute('src', `Img/${NumeroTentativa + 1}.png`);

        const panel = document.getElementById('pnlJogoId');

        panel.querySelector('h3')?.remove();

        const txtLetrasUsadas = document.createElement('h3');

        txtLetrasUsadas.textContent = letrasUsadas.join(" ");
        txtLetrasUsadas.classList.add('notificacao-erro');

        panel.appendChild(txtLetrasUsadas);
    }

    AtualizarPalavraMostrada(index, value){
        let palavraArray = this.palavraMostrada.textContent.split(' ');
        palavraArray[index] = value;
        this.palavraMostrada.textContent = palavraArray.join(' ');
    }

    ArrumarPalavraMostrada(PalavraSorteada){
        this.palavraMostrada.textContent = Array(PalavraSorteada.length).fill("_").join(" ");
   }

   ResetarJogo(PalavraSorteada){

    this.img.setAttribute('src', 'Img/1.png');

    const panel = document.getElementById('pnlJogoId');
    panel.querySelector('h2')?.remove();
    panel.querySelector('h3')?.remove();
    this.ArrumarPalavraMostrada(PalavraSorteada);

   }
}

