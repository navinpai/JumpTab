'use strict'

browser.runtime.onMessage.addListener(request => {
    $(document).ready(function() {
      var fName = $("<input type=\"text\" class=\""+request.greeting+"\" />");
      $(document.body).prepend(fName);
    })
});