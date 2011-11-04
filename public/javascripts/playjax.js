
function onLinkClick(e){
    // Check if html5 history api is availlable
    if (typeof history.pushState != undefined){

        e.preventDefault();

        var url = $(e.target).attr("href");

        doAjax(url, undefined, "get");
    }
}

function onFormSubmit(e){
    if (typeof history.pushState != undefined){
        var form = e.target,
            data = $(form).serialize(),
            url = form.action,
            method = form.method == "" ? "get" : form.method;

        doAjax(url, data, method);
        return false;
    }
    else{
        return true;
    }
}

function doAjax(url, data, method){

    $.ajax({
        url: url,
        type: method,
        data: data,
        beforeSend: onBeforeSend,
        success: function(result, status, xhr){
            var respUrl = xhr.getResponseHeader("playjax_location");
            history.pushState(result, 'test', respUrl);
            $("#contentContainer").html(result);

            bind();
        }
    });
}

function onBeforeSend(xhr){
    xhr.setRequestHeader("playjax_isAjax", "true");
}

function bind(){
    $("a").unbind("click", onLinkClick).bind("click", onLinkClick);
    $("form").unbind("submit", onFormSubmit).bind("submit", onFormSubmit);
}

$(function(){

    bind();
});