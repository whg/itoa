function go() {

	var ifr = frames[0]
		
	var ifr2 = document.getElementById("uploadframe")

	ifr2.onload = function() { 
		console.log("in")
		var r = ifr.document.getElementById("response")
		if(r != null) {
			console.log("done") 
			var p = document.getElementById("result")
			p.innerHTML = r.innerHTML
		}
		else {
			console.log("bad")
		}
	}
	console.log("hey there")
	

}

window.onload = go
