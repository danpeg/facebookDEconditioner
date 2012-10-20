chrome.extension.sendMessage({method: "getLocalStorage"}, function(response) {
    // increment to storage
    var score = function() {
	    var d = new Date(); 
	    if(!localStorage["visitstofacebook"]) localStorage["visitstofacebook"] = 1;
	    if(!localStorage["lastaccess"]) localStorage["lastaccess"] = d;

	    var last = new Date(localStorage["lastaccess"]);
	    localStorage["lastaccess"] = d; 


	    if(!(last.getDate() == d.getDate() && 
	       last.getMonth() == d.getMonth() &&
	       last.getFullYear() == d.getFullYear())){
		    //not the same day, reset counter
		localStorage["visitstofacebook"] = 1; 
	    } else { 
		localStorage["visitstofacebook"]++;
	    }

	    notificationDefaults = {
		    title:'Facebook DEconditioner', 
		    time: 3000
	  };

        var notification = jQuery.extend(notificationDefaults, {
          text: "You visited Facebook " +  localStorage["visitstofacebook"] + " Times today"
        });
        chrome.extension.sendMessage({method: "showNotification", notification: notification}, function(response) {}); 
      }


    if(window.location.hostname == "www.facebook.com"){
      score();
    }

});
