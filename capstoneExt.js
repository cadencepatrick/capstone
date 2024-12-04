$(document).ready(function () {
//VOICE
    var dogNotShowing = true;
    console.log("Art Gallery ready...")
  
      $("#dogButton").click(testFunction);
  
      function testFunction(){
        console.log("clicked on theme change!")
        $("btn").toggle()
      }
    
    const button = document.getElementById('voiceRecognition');
  
    button.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();   
  
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('You said:', transcript);   
  
        // Do something with the recognized text, e.g., display it, send it to a server, etc.
        var potentialcommand = transcript;
        console.log(potentialcommand);
        var re = /^(click|scroll|enter)\s(.*)/i;
        console.log("re: ", re)
        
        var result = re.exec(potentialcommand);
        console.log("result: ", result);
        if(result) {
          var verb = result[1];
          var arg = result[2]
          console.log("verb: " + verb + ", args: " + arg);
  
          switch(verb){
            case "click":
              // What do we do if we click?
              console.log("Handling clicking");
  
              // lets parse out what the user said
              var stringpieces = arg.split(/\s/);
  
              // Did they give enough commands to specify if its
              // a link or a button?
              if (stringpieces.length > 1){
                // What was the last word they said?
                switch (stringpieces[stringpieces.length-1]){
                  // Was it a link?
                  case "link":
                    // Lets find that link
                    console.log("stringpieces: ", stringpieces);
                    var selector = "a:contains('"+stringpieces[0] +"')"
                    // and then we do stuff with that link
                    // we should also handle errors
                    console.log("we should click on a link...")
  
                    // There are three cases
                    if (stringpieces.includes("target")){
                      console.log("attempting to click on target link");
                      document.getElementById("targetlink").click();
                    }
                    else if (stringpieces.includes("youtube")){
                      console.log("attempting to click on youtube link");
                      document.getElementById("youtubelink").click();
                    }
                    else if (stringpieces.includes("netflix")){
                      console.log("attempting to click on netflix link");
                      document.getElementById("netflixlink").click();
                    }
                    else {
                      alert("Link not found... repeat please...")
                    }
  
                    break;
                  case "button":
                    // lets find that button
                    console.log("button case...")
                    var selector = "button:contains('"+stringpieces[0]+"')"
                    // and then we do stuff with that button
                    console.log("we should click on a button...")
  
                    if(arg.includes("dog")){
                      console.log("figure out how to click on the dog button");
                      document.getElementById("dogButton").click();
                    }
  
                    else if(arg.includes("alert me")){
                      document.getElementById("alertButton").click()
                    }
  
                    else {
                      alert("Button not found... repeat please...")
                    }
                }
                break;
              }
              else {
                alert("Sorry, I didn't get that... repeat please...")
              }
              break;
            case "scroll":
              // what do we do on a scroll?
              console.log("Handling scroll...")
              if (arg == "up"){
                $("html, body").animate(
                  {scrollTop:$(document).scrollTop()-150}
                  ,1000);
              }
              if (arg == "down"){
                $("html, body").animate(
                  {scrollTop:$(document).scrollTop()+150}
                  ,1000);
              }
              break;
            case "enter":
              // what do we do on enter?
              console.log("Handling enter");
              var textToEnter = arg;
              
              console.log("Text to enter: ", arg);
              // Grab the input field
              //var inputField = document.getElementById("myInput");
              // Append text to enter
              document.getElementById("myInput").value += "" + textToEnter;
              //inputField.value += " " + textToEnter;
              break;
            default:
              // error message goes here
              alert("Did not process... repeat please...")
          }
  
        }   
        else {
          alert("Did not process... repeat please...")
        } 
      };
  
      recognition.start();
    });
  
  })