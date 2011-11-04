var ignoreNextStateChange = false;
var ajaxContentId = "playjax_content";



$(function(){
    $(window).bind('hashchange', function(e){
        if (ignoreNextStateChange){
            ignoreNextStateChange = false;
            return;
        }
        var url = $.param.fragment();

        $.ajax({
            url: url,
            method: "get",
            beforeSend: onBeforSend,
            success: onGetSuccess
        });
    });

    $(window).trigger('hashchange');

    hijaxAnchors();
});

function onGetSuccess(data, result, xhr){
    $("#"+ajaxContentId).html(data);
    syncBbqState(xhr);
}

function onSubmit(e){
    var form = e.target;
    var url = form.action;

    $.ajax({
        url: url,
        method: form.method,
        data: $(form).serialize(),
        beforeSend: onBeforSend,
        success: onSubmitCallback
    })

    e.preventDefault();

    return false;
}

function onSubmitCallback(data, textResult, jqHXR){
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

function onBeforSend(xhr, settings){
    xhr.setRequestHeader("playjax_js_enabled", "true");
}

function hijaxAnchors(){
    $("a").each(function(index, item){
        var href = $(item).attr("href");
        if (href.indexOf("/") == 0){
            $(item).click(onAnchorClick);
        }
    })
}

function onAnchorClick(e){
    var url = $(e.target).attr("href");
    $.bbq.pushState(url, 2);
    return false;
}