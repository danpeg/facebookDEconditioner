chrome.extension.sendMessage({method: "getLocalStorage"}, function(response) {
    // increment to storage
    var score = function() {
	    
	    var d = new Date(); 
	    var month = d.getMonth()+1;
	    var today = d.getFullYear() + "-" + month +"-" + d.getDate();

	    chrome.storage.sync.get('key2', function (object) {
		
		    console.log(object.key2[today]);
		    if(object.key2[today]){
			object[today] = object.key2[today]+1;
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
