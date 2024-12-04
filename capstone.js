console.log("Accessibility Rocks")

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
document.body.classList.toggle("dark-theme");
    
    var className = document.body.className;
    if(className.includes("light-theme")) {
        this.textContent = "Dark Mode";
    }
    else {
        this.textContent = "Light Mode";
    }
    console.log(className);
});

// TEXT TO SPEECH

$(document).ready(function () {
    //define variable so it can be accessed by the event listener later
    var highlightedText = null;

    //function to add highlight to elements on hover
    $("*:not(body)").hover(
        function (ev) {
        //EXECUTED WHEN MOUSE ENTERS AN ELEMENT
            $(this).addClass("highlight"); //red highlight
            highlightedText = this;
            ev.stopPropagation();
        },

        function (ev) {
        //EXECUTED WHEN MOUSE EXITS AN ELEMENT
            $(this).removeClass("highlight");
        }
    );

    //function to read text on space press
    document.addEventListener('keydown', function (e) {
        if (e.code == '' || e.code == 'Unidentified' || e.code == 'Space') {
        //SPEAK
        e.preventDefault(); //stops space from scrolling page
        var pageText = $(highlightedText).text(); //get text from element
        speechSynthesis.speak(new SpeechSynthesisUtterance(pageText));
        
        //check images for alt text
        var alttext = $(highlightedText).attr("alt");
        var srcofimg = $(highlightedText).attr("src");
        if ($(highlightedText).attr('alt')) {
            //HREF IS NOT BLANK
            //read out alt text
            speechSynthesis.speak(new SpeechSynthesisUtterance(alttext));
            } 
        else {
            //HREF IS BLANK
            //read out image source
            speechSynthesis.speak(new SpeechSynthesisUtterance(srcofimg));
            }
        }
        else {
        //STOP SPEAKING AND REMOVE HIGHLIGHT
            speechSynthesis.cancel();
        }
    });
    
})
