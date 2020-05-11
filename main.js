$(document).ready(function(){
    $('.bottom input').focus(function(){
        $('.bottom .fa-microphone').addClass('invisible');
        $('.bottom .fa-google-play').removeClass('invisible');
    });


    $(document).click(function(event){
        var target =  $(event.target);
        if(!target.hasClass('i')){
            $('.bottom .fa-microphone').removeClass('invisible');
            $('.bottom .fa-google-play').addClass('invisible');
            $('.bottom input').val('');
        }

    });

    $('.fa-google-play').click(crea_messaggio);

    $('.bottom input').keypress(function(e) {
      if (e.which == 13) {
        crea_messaggio();
      }
    });





    function crea_messaggio(){
        var testo = $('.bottom input').val();

        if(testo != ''){
            var nuovo_messaggio = $('.template .messaggio.inviati').clone();

            $('.text-container').append(nuovo_messaggio);

            $('.text-container .messaggio.inviati:last-child p').text(testo);

            $('.bottom input').val('');

            setTimeout(function(){
                var frasi_risposta = ['ok!', 'bravo', 'va bene', 'non mi scrivere più'];

                var indice = crea_random(0, 3);
                console.log(indice);

                var nuova_risposta = $('.template .messaggio.ricevuti').clone();

                $('.text-container').append(nuova_risposta);

                $('.text-container .messaggio.ricevuti:last-child p').text(frasi_risposta[indice]);
            }, 1000)

        }


    }

    function crea_random(min, max){
        return Math.floor(Math.random() * max - min +1) + min;
    }

})
