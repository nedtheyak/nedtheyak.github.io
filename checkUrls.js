var newUrl = "";
var loadPage = true;

function redirectUsing(given) {
    switch (given) {
        case "s":
        case "slight":
            newUrl = "https://nedtheyak.itch.io/slight/";
            break;
        case "pm":
            newUrl = "http://prsa.me";
            break;
        case "m":
            newUrl = "http://magmablock.x10host.com";
            break;
        case "h":
        case "home":
            newUrl = "http://kydn.me"
            break;
        case "calc":
            newUrl = "https://kaydenlukeschmidt.wixsite.com/website"
            break;
        default:
            newUrl = "";
            break;
    }

    return newUrl;
}
