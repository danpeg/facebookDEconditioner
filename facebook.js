chrome.extension.sendMessage({method: "getLocalStorage"}, function(response) {
    // increment to storage
    var score = function() {
	    
	    var d = new Date(); 
	    var month = d.getMonth()+1;
	    var today = d.getFullYear() + "-" + month +"-" + d.getDate();
	    //var today = d.getFullYear() + "-" + month +"-21";

	    chrome.storage.sync.get('key2', function (object) {
		    var object = object.key2;
		
		    if(object){
		    if(object[today]){
			object[today] = object[today]+1;
		    }else{
			object[today] = 1;
		   }
		   }else{
			   var object = {};
			   object[today] = 1;
		   }

		    chrome.storage.sync.set({'key2': object});

	    notificationDefaults = {
		    title:'Facebook DEconditioner', 
		    time: 3000
	  };

        var notification = jQuery.extend(notificationDefaults, {
          text: "You visited Facebook " +  object[today]+ " Times today"
        });
        chrome.extension.sendMessage({method: "showNotification", notification: notification}, function(response) {}); 
      });
 } 


    if(window.location.hostname == "www.facebook.com"){
      score();
    }

});
