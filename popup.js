    chrome.storage.sync.get('key2', function (object) {
	    if(object){
		    console.log(object);
	    for(var x in object.key2) {
		   document.write(x + ": " +object.key2[x] + "<br>"); 
	    }
	    }
	 }); 
