/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function change_Name_Page(name){
    $("#hName").text("");
    $("#hName").text(name);
}
function fn_IsNullOrEmpty(x) {
    if (x == null || x.trim() == null || x.trim() == "" || x === " ") {
        return true;
    }
    return false;
}



function fn_generatetemplate(idtemplate, data, container, clean) {
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    var stemplate = $("#" + idtemplate).html();
    var tmpl = Handlebars.compile(stemplate);
    var ctx = {};
    ctx.items = $.parseJSON(data);

    var html = tmpl(ctx);
    if (clean)
        $("#" + container).empty();

    $("#" + container).append(html);
}


function fn_LoadTemplates(templateID, JsonObject) {
    var stemplate = $("#" + templateID).html();
    var tmpl = Handlebars.compile(stemplate);
    var html = tmpl(JsonObject);
    return html;
}



function fn_message(type, message, messageDivId, MessageHeader) {


    var result = '';
    switch (type) {
        case "s":
            result = '<div class="alert alert-success"><strong>' + ((MessageHeader == undefined) ? "Success" : MessageHeader) + '</strong>&nbsp;' + message + '</div>'
            break;
        case "e":
            result = '<div class="alert alert-danger"><strong>' + ((MessageHeader == undefined) ? "Error" : MessageHeader) + '</strong>&nbsp;' + message + '</div>'
            break;
        case "i":
            result = '<div class="alert alert-primary"><strong>' + ((MessageHeader == undefined) ? "Info" : MessageHeader) + '</strong>&nbsp;' + message + '</div>'
            break;
        case "w":
            result = '<div class="alert alert-warning"><strong>' + ((MessageHeader == undefined) ? "Warning" : MessageHeader) + '</strong>&nbsp;' + message + '</div>'
            break;
        default:
            result = '<div class="alert alert-primary"><strong>' + ((MessageHeader == undefined) ? "Info" : MessageHeader) + '</strong>&nbsp;' + message + '</div>'
            break;
    }


    //alert($('div[id$=message_row]').length);
    //if ($('div[id$=message_row]').length <= 0) {
    messageDivId = messageDivId || "message_row";

    $('div[id$=' + messageDivId + ']').html(result).show("fast")
    //if ($('div[id$=' + messageDivId + ']').is(":visible")) $('div[id$=' + messageDivId + ']').html(result).hide("fast").show("fast");
    //else $('div[id$=' + messageDivId + ']').html(result).show("fast");


    setTimeout(function () { $('div[id$=' + messageDivId + ']').fadeOut("slow") }, 5000);

    //$('html, body').animate({ scrollTop: $('div[id$=message_row]').offset().top }, 'fast');
    //alert($('div[id$=message_row]').length);
    //}
    //else {
    //arry.push(result);
    //setTimeout(fn_queuemessage, 6000);
    //}

    //$('div[id$=message_row]').empty().fadeIn().append(result);
    //setTimeout(function () { $('div[id$=message_row]').fadeOut(); }, 6000)
}

function fn_message_list(type, message, messageDivId) {

    var message_deser = JSON.parse(message);

    var result = '';
    switch (type) {
        case "s":
            result = '<div class="alert alert-success">';
            for (var i = 0; i < message_deser.length; i++) {
                result += "*" + message_deser[i] + " <br>";
            }
            result += '</div>';
            break;
        case "e":
            result = '<div class="alert alert-danger">';
            for (var i = 0; i < message_deser.length; i++) {
                result += "*" + message_deser[i] + " <br>";
            }
            result += '</div>';
            break;
        case "i":
            result = '<div class="alert alert-required">' ;
            for (var i = 0; i < message_deser.length; i++) {
                result += "*" + message_deser[i] + " <br>";
            }
            result += '</div>';
            break;
        case "w":
            result = '<div class="alert alert-warning">';
            for (var i = 0; i < message_deser.length; i++) {
                result += "*" + message_deser[i] + " <br>";
            }
            result += '</div>';
            break;
        default:
            result = '<div class="alert alert-primary">';
            for (var i = 0; i < message_deser.length; i++) {
                result += "*" + message_deser[i] + " <br>";
            }
            result += '</div>';
            break;
    }

    messageDivId = messageDivId || "message_row";

    $('div[id$=' + messageDivId + ']').html(result).show("fast");

    setTimeout(function () { $('div[id$=' + messageDivId + ']').fadeOut("slow") }, 5000);
}

function fn_callmethod(url, data, success, error, complete) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: success,
        error: error,
        complete: complete
    });
}



function fn_RedirectPage(redirect) {
    var url = window.location.href;
    var domain = window.location.origin;
    if (domain == undefined) {
        window.location.assign(redirect);
    }
    else {
        window.location.assign(redirect);
    }

}



function fn_YoutubeOrVimeo(test_url) {
    try {
        var testLoc = document.createElement('a');
        testLoc.href = test_url.toLowerCase();
        url = testLoc.hostname;
        var what;
        if (url.indexOf('youtube.com') !== -1) {
            what = 'youtube';
        } else if (url.indexOf('vimeo.com') !== -1) {
            what = 'vimeo';
        } else {
            what = 'None';
        }
        return what;
    } catch (e) {
        return "";
    }
  
}


function fn_YoutubeID(url) {
    try {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }
   
}


function fn_VimeoID(url) {
    try {
        var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
        var match = url.match(regExp);
        if (match && match[3].length && match[3].length > 0) {
            return match[3];
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }

}


function fn_LoadImage() {

}


function fn_CheckYouVid(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return p.test(url)
}

function fn_CheckViVid(url) {
    var regVimeo = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    return regVimeo.test(url)
}


function fn_LoadVimeoImage(url, img)
{
    //http://player.vimeo.com/video/41735974
    //http://vimeo.com/api/v2/video/1185346.json

    var $img = img
    var id = fn_VimeoID(url);
    // var id = fn_getURLParameterFromUrl(parm, url)
    $.ajax({
        type: 'GET',
        url: 'http://vimeo.com/api/oembed.json?url=http://vimeo.com/' + id + '&format=json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function (data) {

            $img.attr("src", data.thumbnail_url);
            //$(".loader-linki").hide()
            //imgurl = data.thumbnail_url
        }
    });
}

/*XValidationSelect2--start*/
function fn_initValidateSelect(id, idfrm) {// id:element initial in plugin select2,idfrm:frm in content select2
    $(id).on("select2:open", function (e) { ValidationSelect2(idfrm); });
    $(id).on("select2:close", function (e) { ValidationSelect2(idfrm); }); 

}

function ValidationSelect2(id) {//frm in content select2
    $('#' + id + ' span').each(function () {
        var $this = $(this);
        if ($this.hasClass('select2-container')) {
            $this.children().remove("#eSel2");
            $this.children().children().removeClass("errorSelect2");
            if ($this.children().children().children().children().hasClass('select2-selection__placeholder')) {
                $this.children().children().addClass('errorSelect2');
                $this.append('<span id="eSel2" class="vanadium-advice vanadium-invalid">This is a required field</span>');
            }

        }

    });
}
/*XValidationSelect2--end*/

