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
//on click sull'icona oppure premendo invio richiamo la funzione crea_messaggio
    $('.fa-google-play').click(crea_messaggio);

    $('.bottom input').keypress(function(e) {
      if (e.which == 13) {
        crea_messaggio();
      }
  });


$('.contact-container .account').click(function(){
    var nome = $(this).find('.account-name p:first-child').text()
    var url_img = $(this).find('.avatar img').attr('src');
    $('#chat .header .account-name p:first-child').text(nome);
    $('#chat .header .avatar img').attr('src', url_img);

    $('#chat .text-container').each(function(){
        var title = $(this).attr('title');
        console.log(title);
        if(title != nome){
            $('#chat .text-container').hide();
            var nuova_chat = $('.template .text-container').clone();
            nuova_chat.attr('title', nome);
            nuova_chat.insertAfter('#chat .header')
        }
    })


})


//
    show_dropdown();
//cliccando sull'icona o digitando qualsiasi tasto richiamo la funzione cerca_contatto
    $('.cerca input').keypress(function() {
          var inputp = $('.cerca input').val()
          cerca_contatto(inputp);
    });
    $('.cerca span').click(function() {
          var inputp = $('.cerca input').val()
          cerca_contatto(inputp);
    });

//cliccando sul link del div notifiche sparisce
$('#contatti .notifiche a').click(function(){
    $('#contatti .notifiche').hide();
    $('.contact-container').addClass('height-large');
})



//FUNZIONI
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
        show_dropdown();
    }

    function crea_random(min, max){
        return Math.floor(Math.random() * max - min +1) + min;
    }
//funzione per far apparire sparire il dropdown
    function show_dropdown(){
        //se clicco su un messaggio inviato chiudo eventuali dropdown aperti e  visualizzo il dropdown del messaggio cliccato
        $('.text-container .inviati').click(function(){
            $('.dropdown').addClass('invisible');
            var menu = $(this).find('.dropdown');
            menu.removeClass('invisible');
        });
        //se clicco su remove Message aggiungo la classe ms_cancellato e cambio il testo del messaggio corrente con 'messaggio cancellato'
        $('.dropdown ul li:last-child').click(function(){
            var ms_corrente = $(this).parents('.inviati')
            ms_corrente.addClass('ms-cancellato')
            ms_corrente.find('p').text('questo messaggio è stato cancellato')
            ms_corrente.find('.info-ms').hide();
            ms_corrente.find('.dropdown').hide()
        });
        //se clicco fuori dal messaggio il dropdown scompare
        $(document).click(function(event){
            var target =  $(event.target);
            if(!target.hasClass('show')){
                $('.dropdown').addClass('invisible');
            }
        });
    }
//funzione per la ricerca del contatto
    function cerca_contatto(input){
        //rendo minuscolo l'input
        input = input.toLowerCase();
        //se l'input non è vuoto
        if(input != ''){
            //per ogni account prendo il nome e vedo se inizia con 'l'input
            $('.contact-container .account .account-name p:first-child').each(function(){
                //leggo il contenuto del p e lo rendo minuscolo
                var nome = $(this).text();
                nome = nome.toLowerCase();
                //faccio sparire gli account con nomi diversi dall'input
                // if(!nome.includes(input)){
                //     $(this).parents('.account').hide();
                // }
                //usando startsWith e non include
                if(!nome.startsWith(input)){
                    $(this).parents('.account').hide();
                }
            })
        }else{
            $('.contact-container .account').show()
        }
    }

})
