/**
 * Created by mike
 */
jQuery(function($){
    $.fn.amazonRender = function(res) {
        var obj = jQuery.parseJSON(res);
        $(this).empty().append(
            '<ul>' +
                '<li>' + obj.image + '</li>' +
                '<li>' +
                    '<label>Title:</label> ' + obj.title +
                    '<br/><label>Price:</label> ' + obj.price +
                    '<br/><label>Description:</label> ' + obj.description +
                '</li>' +
            '</ul>'
        );
    };
    $(".request-form").on("submit", function(evt){
        $.ajax({
            url: "app/api/robots/search/" + $("#q").val()
        }).done(function(results){
            $('.amazon-result').amazonRender(results);
        });
        evt.preventDefault();
    });
});