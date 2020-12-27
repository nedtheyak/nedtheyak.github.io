var newUrl = "";
var loadPage = true;

function redirectUsing(given) {
    switch (given.replace(/\/+$/, "").toLowerCase()) {
        case "/h":
        case "/home":
            newUrl = "https://kaydens.ca"
            break;
		case "/d":
		case "/dress":
		case "/dressember2020":
		case "/december":
			newUrl = "https://kaydens.ca/dressember";
			break;
		case "/dress/amy":
		case "/dressember/amy":
			newUrl = "https://dressemberijm-2020.funraise.org/fundraiser/amy-forsyth/";
			break;
		case "/dress/ellie":
		case "/dressember/ellie":
		case "/dress/aurelia":
		case "/dressember/aurelia":
			newUrl = "https://dressemberijm-2020.funraise.org/fundraiser/aurelia-forsyth/";
			break;
		case "/dress/jason":
		case "/dressember/jason":
			newUrl = "https://dressemberijm-2020.funraise.org/fundraiser/jason-schmidt/";
			break;
		case "/dress/kayden":
		case "/dressember/kayden":
			newUrl = "https://dressemberijm-2020.funraise.org/fundraiser/kayden-schmidt/";
			break;
		case "/dress/team":
		case "/dressember/team":
			newUrl = "https://dressemberijm-2020.funraise.org/team/man-its-cold/";
			break;
        case "/s":
        case "/slight":
            newUrl = "https://nedtheyak.itch.io/slight/";
            break;
        case "/pm":
            newUrl = "http://prsa.me";
            break;
        case "/m":
            newUrl = "http://magmablock.x10host.com";
            break;
        case "/calc":
            newUrl = "https://kaydenlukeschmidt.wixsite.com/website"
            break;
        case "/bcit/comp1536/zombie":
            newUrl = "https://kaydens.ca/Zombie"
            break;
        case "/bcit/comp1536/assignments/lab8":
            newUrl = "https://kaydens.ca/assignments/lab8";
            break;
        default:
            newUrl = "";
            break;
    }
    
    return newUrl;
}
