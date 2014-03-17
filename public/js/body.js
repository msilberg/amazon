/**
 * Created by mike
 */
jQuery(function($){
    $.fn.amazonRender = function(res) {
        $('#floatingBarsG').hide();
        if (res.length == 0){
            $(this).append(
                'nothing was found according to your request'
            ).show();
        }else{
            var obj = jQuery.parseJSON(res);
            $(this).append(
                '<ul>' +
                    '<li>' + obj.image + '</li>' +
                    '<li>' +
                    '<label>Title:</label> ' + obj.title +
                    '<br/><label>Price:</label> ' + obj.price +
                    '<br/><label>Description:</label> ' + obj.description +
                    '<br/><label>Image URL:</label> ' + obj.image_url +
                    '</li>' +
                    '</ul>'
            ).show();
        }
    };
    $(".request-form").on("submit", function(evt){
        var resultCont = $('.amazon-result');
        resultCont.empty().hide();
        $('#floatingBarsG').show();
        $.ajax({
            url: "app/api/robots/search/" + $("#q").val()
        }).done(function(results){
            resultCont.amazonRender(results);
        });
        evt.preventDefault();
    });
});