
print "begin"

import os, sys, math
import bisect
import pickle
import Image

datafile = "colour_data"


def doimage(inputfile, outputfile, desiredwidth, forfile):
	
	img = Image.open(inputfile)
		
	width = int(desiredwidth);
	height = int((float(desiredwidth)/img.size[0])*img.size[1])
	
	if(forfile == "True"):
		height/= 2
	
	#create a new image with the new dimensions
	img = img.resize((width, height), Image.BICUBIC);
	
	#now get the pixel data in list form
	pixels = list(img.getdata())
	pixeldata = []
	
	try:
		if(len(pixels[0]) == 3):
			pixeldata = [(r+g+b)/3 for r,g,b in pixels]
	except TypeError:
		pixeldata = pixels
	
	f = open("./"+datafile, 'r');
	sr = pickle.load(f);
	f.close()
	
	with open(outputfile, 'w') as f:
	
		i = 0
		
		for target in pixeldata:	
			
			#find closest number bigger than target...
			p = bisect.bisect_right([x for x,y in sr], target)
			fr = sr[p-1]
			
			#now make sure the bigger is closer than smaller
			if abs(sr[p-1][0]-target) > abs(sr[p-2][0]-target):
				fr = sr[p-2]
			
			f.write(str(fr[1]))
			
			i+= 1
			
			if i % width == 0:
				f.write("<br />\n")
					
		f.close()

	
#a little helper function to access pixels array
def getloc(x, y, w):
	return x + (y*w)
	
#this function reads a file and then serialises the values to be used later
def getletters():
	
	letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@$$%^&*()_+{};'\\:\",./?"
	
	img = Image.open("letters3.png")
	
	results = []
	pixels = list(img.getdata())
	w, h = img.size
	
	#these are the width and height of the text boxes in the image file
	bx, by = 12, 15
	
	#probably not the best way to do it...
	for i in range(0, w, bx):
		for j in range(0, h, by):
			b = 0
			for k in range(bx):
				for l in range(by):
					for m in range(3):
						p = int(getloc(i+k, j+l, w))
						b+= pixels[p][m]
						
			results.append(b/(3.0*bx*by))
	
	sr = [] #this will hold the results

	if len(letters) == len(results):
		for i, l in enumerate(letters):
			sr.append((results[i], l))
	else:
		print "not same length", len(letters), len(results)
	
	#now sort
	sr.sort()
	
	#and now scale so values are from 0 to 255
	#this is super messy here...
	mn = sr[0][0]
	mx = sr[-1][0]/mn - 1
	#and this is where python gets really cool...
	sr = [(((x/mn - 1)/mx*255), y) for x,y in sr]
	
	#now serialize
	with open(datafile, 'w') as f:	
		pickle.dump(sr, f);
		
	f.close()
	
	print "serialised data"

def main():
	
	if len(sys.argv) == 2:
		if sys.argv[1] == "getletters":
			getletters()
			
	else:	
		doimage(sys.argv[1], sys.argv[2], 100, sys.argv[3]);


	# 	#check arguments are there
# 	elif len(sys.argv) < 3:
# 		print "wrong usage"
# 		exit()
	

main()
