chrome.extension.sendMessage({method: "getLocalStorage"}, function(response) {

    // increment to storage
    var score = function() {

	    var d = new Date(); 
	    if(!localStorage["visitstofacebook"]) localStorage["visitstofacebook"] = 1;
	    if(!localStorage["lastaccess"]) localStorage["lastaccess"] = d;
	    var last = new Date(localStorage["lastaccess"]);


	    if(!(last.getDay() == d.getDay() && 
	       last.getMonth() == d.getMonth() &&
	       last.getYear() == d.getYear())){
		    //not same day
		localStorage["visitstofacebook"] = 1; 
	    } else { 
		localStorage["visitstofacebook"]++;
	    }


	    localStorage["lastaccess"] = d; 


	    console.log(localStorage);


	    notificationDefaults = {
		    title:'FacebookConditioner', 
		    time: 0
	  };

        var notification = jQuery.extend(notificationDefaults, {
          text: "Visited Facebook " +  localStorage["visitstofacebook"] + " Times today"
        });
        chrome.extension.sendMessage({method: "showNotification", notification: notification}, function(response) {}); 
      }


    console.log(window.location.hostname);
    if(window.location.hostname == "www.facebook.com"){
      score();
    }

    /*
    var viceDomains = "facebook.com";
    var wwwViceDomains = _.map(viceDomains, function(domain){
      return 'www.'+domain
    });
    var badHosts = viceDomains.concat(wwwViceDomains);
    if (_.include(badHosts, window.location.hostname)) {
      // Dock points once they enter the site, and every 5 minutes they're on the site
      score();
    }
    
    // Give points for completing Workflowy tasks 
    /*if (window.location.hostname === 'workflowy.com') {
      jQuery(".editor").watch('text-decoration', function(){
        console.log(jQuery(this));
      });
    }*/
});
