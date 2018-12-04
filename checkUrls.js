var newUrl = "";

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
        window.open(newUrl, '_self');
    } else {
        // load page
        document.getElementById('bod').innerHTML = '<h1>Get 404d</h1><br /><p>Yeah, you should probably just <a href="http://kydn.me">go home</a></p>';
    }
}