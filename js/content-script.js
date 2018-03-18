'use strict'

browser.runtime.onMessage.addListener(request => {
    console.log("message received");
        $(document).ready(function() {
          var fName = $("<input type=\"text\" class=\""+request.greeting+"\" />");
          $(document.body).prepend(fName);
        })
});