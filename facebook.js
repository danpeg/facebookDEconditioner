chrome.extension.sendMessage({method: "getLocalStorage"}, function(response) {
    // increment to storage
    var score = function() {
	    

	    var visitstofacebook = 1;
	    // a bit of a hack..
	    var last =  new Date("July 21, 1983 01:15:00");
	    var d = new Date(); 
	    var object = JSON.parse(localStorage.getItem("key"));
	    if(object){
	    	visitstofacebook = object.visits;
		last = new Date(object.timestamp);
	    }

	    if((last.getDate() == d.getDate() && 
	       last.getMonth() == d.getMonth() &&
	       last.getFullYear() == d.getFullYear())){
		    // same day; increment
		visitstofacebook++;
	    }

	    object = {visits: visitstofacebook, timestamp: new Date()}
	    localStorage.setItem("key", JSON.stringify(object));

	    notificationDefaults = {
		    title:'Facebook DEconditioner', 
		    time: 3000
	  };

        var notification = jQuery.extend(notificationDefaults, {
          text: "You visited Facebook " +  visitstofacebook  + " Times today"
        });
        chrome.extension.sendMessage({method: "showNotification", notification: notification}, function(response) {}); 
      }


    if(window.location.hostname == "www.facebook.com"){
      score();
    }

});
