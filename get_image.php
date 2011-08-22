<?php 

$response = "";

//a helper function to find the extension of a given string
function find_extension($s) {
	$w = explode(".", $s);
	$n = count($w);
	return "." . $w[$n-1];
}

date_default_timezone_set('UTC');

//to get a unique name get the current date & time
//...give a random number as well, Sod's law says...
$oname = date("dmY-His") ."-". rand(0, 20);
$name = "";

if($_FILES['file']['name']) {
	echo("got file<br/>");
	$name = $oname . find_extension($_FILES['file']['name']);
	echo($name . "<br/>");
	
	move_uploaded_file($_FILES['file']['tmp_name'], "./images/".$name);
	echo("moved file<br/>");
} 

else {
	if(isset($_POST['url_image'])) {
	
		//make sure we have something to work with
		if($_POST['url_image'] == "") {
			$response = "URL is empty.";
		}
		
		else {
			$img;
			if($img = file_get_contents($_POST['url_image'])) {
				$name = $oname . find_extension($_POST['url_image']);
				file_put_contents("./images/" . $name, $img);
			}
			else {
				$response = "Could not read file...";
			}
		}
	}
}

//do we want the result for a file?
$forfile = 0;
if($_POST['forfile'] == "on") {
	$forfile = 1;
	echo("asdfEDJKLHSKHD");
}


if($response == "") {
	
	$call = "python itoa.py ./images/$name ./ascii/$oname.txt";
	
	if($forfile) {
		$call .= " True";
	} 
	else {
		$call .= " False";
	}
	
	//excute python script with the right PATH
	exec("PATH=/opt/local/bin:/opt/local/sbin:$PATH; $call", $a, $b);
	
	echo($call);
	
	//open file and get response
	$response = file_get_contents("./ascii/$oname.txt");
}

//spit out the response
echo('<p id="response">'.$response.'</p>');

?>