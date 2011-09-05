function go() {
	
	var ifr = frames[0]
	
	//we have to do this, very weird...		
	var ifr2 = document.getElementById("uploadframe")

	var p = document.getElementById("result")
	var thetext = ""
	var imgpath = "images/"
	
	var change = document.getElementById("change")
	
	ifr2.onload = function() { 

		var r = ifr.document.getElementById("response")
		var path = ifr.document.getElementById("imagename")

		clearInterval(showprogress)
		p.innerHTML = r.innerHTML;
		
		if(r != null && r.innerHTML != "sorry, couldn't do it with that file...") {
			change.innerHTML = "Click here to see the original image"
			p.innerHTML = r.innerHTML
			thetext = r.innerHTML
			change.setAttribute("type", "ascii")
			change.style.backgroundColor = "#fffa5c"
			
			
			change.onmousedown = function() {
				if(this.getAttribute("type") == "image") {
					change.innerHTML = "Click on the ASCII to see the original image"
					p.innerHTML = thetext
					this.setAttribute("type", "ascii")
				}
				else {
					change.innerHTML = "Click here to see the ASCII"
					p.innerHTML = ""
					var img = document.createElement("img")
					img.src = imgpath + path.innerHTML
					p.appendChild(img)
					this.setAttribute("type", "image")
				}
			}
		}	
	}

	var c = 0
	
	var form = document.getElementsByTagName("form")[0]
	
	form.onsubmit = function() {		
		showprogress = setInterval(function() {
			
			var n = 20
			var prog = []
			
			for(var i = 0; i < n; i++) {
				prog[i] = "."
				if(i == c) {
					prog[i] = "#"
				}
			}
			c++
			
			if(c == n-1) {
				c = 0
			}
			
			p.innerHTML = prog.join("")
			
		}, 100)
		
	}
	
}

window.onload = go
