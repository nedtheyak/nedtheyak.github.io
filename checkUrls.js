var newUrl = "";
var loadPage = true;

function redirectUsing(given) {
    switch (given) {
        case "s":
            newUrl = "http://kydn.me/slight";
            break;
        default:
            newUrl = "";
            break;
    }

    return newUrl;
}
