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
            newUrl = "https://kydn.me"
            break;
        case "calc":
            newUrl = "https://kaydenlukeschmidt.wixsite.com/website"
            break;
        case "bcit/comp1536/Zombie":
        case "bcit/comp1536/zombie":
            newUrl = "https://kydn.me/Zombie"
            break;
        case "bcit/comp1536/assignments/lab8":
        case "assignments/lab8":
            newUrl = "https://kydn.me/assignments/lab8";
            break;
        default:
            newUrl = "";
            break;
    }
    
    return newUrl;
}
