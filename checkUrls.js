var newUrl = "";
var loadPage = true;

function redirectUsing(given) {
    switch (given) {
        case "s":
            newUrl = "slight"
            break;
        default:
            // do nothing
            break;
    }
    if (newUrl != "") {
        loadPage = false;
    }
    return [loadPage, newUrl];
}