$(document).ready(function(){
//on focus sull'input rendo visibile l'icona di invio
    $('.bottom input').focus(function(){
        $('.bottom .fa-microphone').addClass('invisible');
        $('.bottom .fa-google-play').removeClass('invisible');
    });

//cliccando sul documento eccetto l'input e l'icona di invio inverto le icone
    $(document).click(function(event){
        var target =  $(event.target);
        if(!target.hasClass('i')){
            $('.bottom .fa-microphone').removeClass('invisible');
            $('.bottom .fa-google-play').addClass('invisible');
            $('.bottom input').val('');
        }

    });
//on click sull'icona e premendo invio richiamo la funzione crea_messaggio
    $('.fa-google-play').click(crea_messaggio);

    $('.bottom input').keypress(function(e) {
      if (e.which == 13) {
        crea_messaggio();
      }
    });



    function crea_messaggio(){
        //salvo in testo il val inserito daal'utente
        var testo = $('.bottom input').val();

        if(testo != ''){
            //clono il messaggio dal template
            var nuovo_messaggio = $('.template .messaggio.inviati').clone();
            //con append inserisco il messaggio nel documento
            $('.text-container').append(nuovo_messaggio);
            //inserisco nel messaggio il testo dell'utente
            $('.text-container .messaggio.inviati:last-child p').text(testo);
            //risetto il val dell'input a vuoto
            $('.bottom input').val('');
            //timeout per inserire il messaggio di risposta
            setTimeout(function(){
                //creo un array contenente le risposte
                var frasi_risposta = ['ok!', 'bravo', 'va bene', 'non mi scrivere più'];
                //estraggo casualmente l'indice della risposta
                var indice = crea_random(0, 3);
                //clono il messaggio di risposta
                var nuova_risposta = $('.template .messaggio.ricevuti').clone();
                //con append inserisco il messaggio nel documento
                $('.text-container').append(nuova_risposta);
                //inserisco nel messaggio la risposta con l'indice estratto
                $('.text-container .messaggio.ricevuti:last-child p').text(frasi_risposta[indice]);
            }, 1000)
        }
    }

    function crea_random(min, max){
        return Math.floor(Math.random() * max - min +1) + min;
    }

})
