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
			if(file_get_contents($_POST['url_image'])) {
				$name = $oname . find_extension($_POST['url_image']);
				file_put_contents("./images/" . $name);
			}
			else {
				$response = "Could not read file...";
			}
		}
	}
}

if($response == "") {
	//now call the python script, which does the fancy stuff...
	$call = "python itoa.py ./images/$name ./ascii/$oname.txt";
/* 	system($call); */
/* 	system("echo 'hi' > text.txt"); */
/* 	echo($name ." ". $oname); */
/* 	echo("this is it: "); */
/* 	print_r(exec("bash do_python.sh $name $oname", $a, $b)); */
	
	print_r(exec($call, $a, $b));
	print_r($a);
	print_r($b."<br/>");
/* 	$response.= "called python: $call"; */
}

//spit out the response
echo('<p id="response">'.$response.'</p>');

?>