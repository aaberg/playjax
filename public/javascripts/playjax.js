var ignoreNextStateChange = false;
var ajaxContentId = "playjax_content";

$(function(){
    $(window).bind('hashchange', function(e){
        if (ignoreNextStateChange){
            ignoreNextStateChange = false;
            return;
        }
        var url = $.param.fragment();

        $("#" + ajaxContentId).load(url, function(data, textResult, jqHXR){
            bindForms();
            syncBbqState(jqHXR);
        });
    });

    $(window).trigger('hashchange');
});

function bindForms(){
    $("form").submit(function(e){
        var form = e.target;
        var url = form.action;

        e.preventDefault();

        $.ajax({
            url: url,
            method: form.method,
            data: $(form).serialize(),
            success: submitCallback
        })

        return false;
    });
}

function submitCallback(data, textResult, jqHXR){
    $("#" + ajaxContentId).html(data);
    syncBbqState(jqHXR);
}

function syncBbqState(jqHXR){
    var location = jqHXR.getResponseHeader("playjax_location");
    var state = $.param.fragment();

    if (location != state){
        ignoreNextStateChange = true;
        $.bbq.pushState(location, 2);
    }

}