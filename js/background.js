'use strict';

var openingView = false;

function onError(error) {
  console.error(`Error: ${error}`);
}

var options = ["hello", "world", "lorem", "ipsum"];


function openSearchBox() {
   var querying = browser.tabs.query({currentWindow: true, active: true});
   querying.then(function(res){
    browser.tabs.sendMessage(
            res[0].id,
            {greeting: "Hi from background script"}).then(response => {
                console.log("Message from the content script:");
                console.log(response.response);
              }).catch(onError);

        console.log("open searchbox");
   }, onError);
  /*var executing = browser.tabs.executeScript({
        file: "/content-scripts/content-script.js",
        allFrames: false
    });
    executing.then(null, onError); */
}

function init() {
    console.log("in init");

    browser.browserAction.onClicked.addListener( openSearchBox );
	browser.commands.onCommand.addListener( async function( command ) {
			if ( command == "open-jumptab" ) {
                console.log("open keyboard shortcut");
				openSearchBox();
			}
	} );
}

init();