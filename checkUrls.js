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
    alert(String(loadPage));
    alert(newUrl);
    return (new Array([loadPage, newUrl]));
}
