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

    function crea_messaggio(){
        var testo = $('.bottom input').val();

        if(testo != ''){
            var nuovo_messaggio = $('.template .messaggio').clone();

            $('.text-container').append(nuovo_messaggio);

            $('.text-container .messaggio.inviati:last-child p').text(testo);

            $('.bottom input').val('')

        }


    }



})
