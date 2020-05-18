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

//cliccando sull'icona o digitando qualsiasi tasto richiamo la funzione cerca_contatto
    $('.cerca input').keypress(function(e) {
          var input = $('.cerca input').val()
         if (e.which == 13){
              cerca_contatto(input);}
    });
    $('.cerca span').click(function() {
          var input = $('.cerca input').val()
          cerca_contatto(input);
    });


//cliccando sul link del div notifiche sparisce
$('#contatti .notifiche a').click(function(){
    $('#contatti .notifiche').hide();
    $('.contact-container').addClass('height-large');
})




//cliccando su un account apro la chat corrispondente se esiste altrimenti la creo e modifico i dati nell'header
$('.contact-container .account').click(function(){
    //recupero il nome e l'avatar del cerca_contatto
    var nome = $(this).find('.account-name p:first-child').text()
    var url_img = $(this).find('.avatar img').attr('src');
    //e gli aggiungo nell'header della chat
    $('#chat .header .account-name p:first-child').text(nome);
    $('#chat .header .avatar img').attr('src', url_img);
    //setto l'ora dell'ultimo accesso alla chat sia nell'header che nello span dell'account
    var orario = ora();
    $('#chat .header .account-name p:last-child span').text(orario);
    $('[data-ua= '+ nome +']').find('.ora-account').text(orario);
    //se al contatto corrisponde un text-container lo visualizzo altrimenti lo creo
    var chat = $('[data-nome= '+ nome +']')
    if(chat.length == 0){
        nuova_chat(nome);
    }else{
        $('.text-container').hide()
        chat.show()
    }
})




//aggiungi contatto nuovo
$('.aggiungi-contatto').click(function(){

    $('.dropdown-contatti').toggleClass('invisible')
})

$('.dropdown-contatti button').click(function(){
    var nome = $('.dropdown-contatti input:first-of-type').val()
    var foto = $('.dropdown-contatti input:last-of-type').val()

    if(nome != '' && foto != '' && !isNaN(foto) && (foto>0 && foto<11)){
        foto = 'img/avatar'+foto+'.png'
        var nuovo_contatto = $('.template .account').clone()

        nuovo_contatto.find('.account-name p:first-child').text(nome)
        nuovo_contatto.attr('data-ua', nome)
        nuovo_contatto.find('.avatar img').attr('src', foto);

        $('.contact-container').prepend(nuovo_contatto);
        $('.dropdown-contatti').addClass('invisible');
        $('.dropdown-contatti input').val('')


        $('.contact-container .account').click(function(){
            //recupero il nome e l'avatar del cerca_contatto
            var nome = $(this).find('.account-name p:first-child').text()
            var url_img = $(this).find('.avatar img').attr('src');
            //e gli aggiungo nell'header della chat
            $('#chat .header .account-name p:first-child').text(nome);
            $('#chat .header .avatar img').attr('src', url_img);
            //setto l'ora dell'ultimo accesso alla chat sia nell'header che nello span dell'account
            var orario = ora();
            $('#chat .header .account-name p:last-child span').text(orario);
            $('[data-ua= '+ nome +']').find('.ora-account').text(orario);
            //se al contatto corrisponde un text-container lo visualizzo altrimenti lo creo
            var chat = $('[data-nome= '+ nome +']')
            if(chat.length == 0){
                nuova_chat(nome);
            }else{
                $('.text-container').hide()
                chat.show()
            }
        })


    }else{
        alert('hai inserto valori non validi');
        $('.dropdown-contatti').addClass('invisible')
        $('.dropdown-contatti input').val('')
    }

})
//fine aggiungi nuovo_contatto
//FUNZIONI
    function crea_messaggio(){
        //salvo in testo il val inserito dall'utente
        var testo = $('.bottom input').val();
        var nome_account = $('#chat .header .account-name p:first-child').text()
        var orario = ora();

        if(testo != ''){
            var source   = $('#message-template').html();
            var template = Handlebars.compile(source);
            var context = {testo: testo, ora: orario, tipo: 'inviati', icona2: 'invisible'};
            var html = template(context);
            $('[data-nome= '+ nome_account +']').append(html)
             $('.bottom input').val('');
             //     //timeout per inserire il messaggio di risposta
                 setTimeout(function(){
                     //dopo un secondo visualizzo le due spunte blu
                    var te = $('[data-nome= '+ nome_account +'] .inviati .info-ms .fa-check').addClass('invisible')

                     $('[data-nome= '+ nome_account +'] .inviati .info-ms .fa-check-double').removeClass('invisible')

                     // html.find('.fa-check-double').removeClass('invisible');
                     // html.find('.fa-check').addClass('invisible')

                     //creo un array contenente le risposte
                     var frasi_risposta = ['ok!', 'bravo', 'va bene', 'non mi scrivere più', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];
                     //estraggo casualmente l'indice della risposta
                     var indice = crea_random(0, 4);
                     //clono il messaggio di risposta
                     var source2   = $('#message-template').html();
                     var template2 = Handlebars.compile(source2);
                     var context2 = {testo: frasi_risposta[indice], ora: orario, tipo: 'ricevuti', icona: 'invisible', icona2: 'invisible'};
                     var html2 = template(context2);
                     $('[data-nome= '+ nome_account +']').append(html2)


                     //inserisco il testo dell'ultimo messaggio nell'account corrispondente nella sezione di sinistra
                     $('[data-ua= '+ nome_account +']').find('.account-name p:last-child').text(frasi_risposta[indice]);
                      $('[data-ua= '+ nome_account +']').find('.ora-account').text(orario)

                 }, 1000)
        }
//VERSIONE SENZA Handlebars
        // var nome_account = $('#chat .header .account-name p:first-child').text()
        // var orario = ora();
        // if(testo != ''){
        //     //clono il messaggio dal template
        //     var nuovo_messaggio = $('.template .messaggio.inviati').clone();
        //     //con append inserisco il messaggio nel documento
        //     $('[data-nome= '+ nome_account +']').append(nuovo_messaggio);
        //     //inserisco nel messaggio il testo dell'utente
        //     $('.text-container .messaggio.inviati:last-child p').text(testo);
        //     //inserisco l'orario
        //     $('.text-container .messaggio.inviati:last-child .info-ms span').text(orario);
        //     //risetto il val dell'input a vuoto
        //     $('.bottom input').val('');
        //     //timeout per inserire il messaggio di risposta
        //     setTimeout(function(){
        //         //dopo un secondo visualizzo le due spunte blu
        //         nuovo_messaggio.find('.fa-check-double').removeClass('invisible');
        //         nuovo_messaggio.find('.fa-check').addClass('invisible')
        //         //creo un array contenente le risposte
        //         var frasi_risposta = ['ok!', 'bravo', 'va bene', 'non mi scrivere più', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];
        //         //estraggo casualmente l'indice della risposta
        //         var indice = crea_random(0, 4);
        //         //clono il messaggio di risposta
        //         var nuova_risposta = $('.template .messaggio.ricevuti').clone();
        //         //con append inserisco il messaggio nel documento
        //         $('[data-nome= '+ nome_account +']').append(nuova_risposta);
        //         //inserisco nel messaggio la risposta con l'indice estratto
        //         $('.text-container .messaggio.ricevuti:last-child p').text(frasi_risposta[indice]);
        //         //inserisco il testo dell'ultimo messaggio nell'account corrispondente nella sezione di sinistra
        //         $('[data-ua= '+ nome_account +']').find('.account-name p:last-child').text(frasi_risposta[indice]);
        //         //inserisco l'orario
        //         $('.text-container .messaggio.ricevuti:last-child .info-ms span').text(orario);
        //
        //     }, 1000)
        // }
        show_dropdown();
    }

    function crea_random(min, max){
        return Math.floor(Math.random() * max - min +1) + min;
    }
//funzione per far apparire sparire il dropdown e ne gestisce il funzionamento
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
//funzione crea nuova chat
    function nuova_chat(data){
        //clono la nuova chat dal template
        var nuova_chat = $('.template .text-container').clone();
        //le aggiungo l'attributo data e come valore inserisco il nome del contatto
        nuova_chat.attr('data-nome', '' + data + '');
        //nascondo eventuali chat aperte
        $('.text-container').hide();
        //appendo la nuova chat
        nuova_chat.insertAfter('#chat .header');
        //e la visualizzo
        nuova_chat.show();

    }
//funzione di recupero ora
    function ora(){
        var d = new Date();
        var ora = d.getHours();
        var minuti = d.getMinutes();
        if(minuti < 10){
            minuti = '0' + minuti
        };
        if(ora < 10){
            ora = '0' + ora
        };
        var orario = ora + ':' + minuti;
        return orario
    }
})
