var newUrl = "";
var loadPage = true;

function redirectUsing(given) {
    switch (given) {
        case "s":
            newUrl = "http://kydn.me/slight";
            break;
        default:
            // do nothing
            break;
    }
    if (newUrl != "") {
        loadPage = false;
    }
    alert(loadPage);
    alert(newUrl);
    return ([loadPage, newUrl]);
}
