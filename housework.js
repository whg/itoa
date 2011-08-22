function go() {
	
	var ifr = frames[0]
	
	//we have to do this, very weird...		
	var ifr2 = document.getElementById("uploadframe")

	var p = document.getElementById("result")
	var thetext = ""
	var imgpath = "images/"
	
	ifr2.onload = function() { 

		var r = ifr.document.getElementById("response")
		var path = ifr.document.getElementById("imagename")
		
		if(r != null) {
			console.log("done") 
			clearInterval(showprogress)
			p.innerHTML = "<p class=\"tosee\">Click on the ASCII to see the original image</p>"
			p.innerHTML += r.innerHTML
			thetext = r.innerHTML
			p.setAttribute("type", "ascii")
			
			p.onmousedown = function() {
				if(this.getAttribute("type") == "image") {
					this.innerHTML = "<p class=\"tosee\">Click on the ASCII to see the original image</p>"
					this.innerHTML += thetext
					this.setAttribute("type", "ascii")
				}
				else {
					this.innerHTML = "<p class=\"tosee\">Click on the image to see the ASCII</p>"
					var img = document.createElement("img")
					img.src = imgpath + path.innerHTML
					this.appendChild(img)
					this.setAttribute("type", "image")
				}
			}
		}	
	}

	var c = 0
	
	var form = document.getElementsByTagName("form")[0]
	
	form.onsubmit = function() {
		console.log("submit")
		
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
