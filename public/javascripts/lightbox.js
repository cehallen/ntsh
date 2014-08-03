


$(document).ready(function() {

    $('.thumbImage').on('click', function(e) {
        e.preventDefault();

        $('#lightbox').toggleClass('hide');

        var url = "/flickrEmbeds/" + $(this).data('album') + ".html";

        $.get(url, function(data) {
            $('.embed').html(data);
        });
    });

    $('#lightbox').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('hide');
    });
});
