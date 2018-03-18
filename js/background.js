'use strict';

var openingView = false;

function onError(error) {
  console.error(`Error: ${error}`);
}

async function getViewId() {
	const tabs = await browser.tabs.query( { url: browser.extension.getURL( "view.html" ), currentWindow: true } );

	return tabs.length ? tabs[ 0 ].id : undefined;
}

var options = ["hello", "world", "lorem", "ipsum"];


async function openSearchBox(tab) {
    console.log(tab.id);  
	const viewId = await getViewId();
    browser.tabs.sendMessage(
        tab.id,
        {greeting: "Hi from background script"}
      ).then(response => {
            console.log("Message from the content script:");
            console.log(response.response);
          }).catch(onError);

    console.log("open searchbox");
    /*var executing = browser.tabs.executeScript({
        file: "/content-scripts/content-script.js",
        allFrames: false
    });
    executing.then(null, onError); */
}

async function init() {
    console.log("in init");

    browser.browserAction.onClicked.addListener( openSearchBox );
	browser.commands.onCommand.addListener( async function( command ) {
			if ( command == "open-jumptab" ) {
                console.log("open keyboard shortcut");
				var gettingCurrent = browser.tabs.getCurrent();	
                gettingCurrent.then(openSearchBox(res), onError);
			}
	} );
}

init();