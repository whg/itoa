function go() {

	var ifr = frames[0]
	
	//console.log(frames.length	)
	
	var ifr2 = document.getElementById("uploadframe")
	
	ifr2.onload = function() { 
	
		var r = ifr.document.getElementById("response")
		if(r != null) {
			console.log(r.innerHTML) 
		}
	}
	console.log("hey there")
}

window.onload = go