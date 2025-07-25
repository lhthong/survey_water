<?php
/*
header("Content-Type: application/json");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: POST"); // here is define the request method
*/
//include 'dbconfig.php'; // include database connection file
require_once("server.php");
$data = json_decode(file_get_contents("php://input"), true); // collect input parameters and convert into readable format
	
$fileName  =  $_FILES['sendimage']['name'];
$tempPath  =  $_FILES['sendimage']['tmp_name'];
$fileSize  =  $_FILES['sendimage']['size'];

		
if(empty($fileName))
{
	$errorMSG = json_encode(array("message" => "please select image", "status" => false));	
	echo $errorMSG;
}
else
{
	$upload_path = '../serverfileupload/'; // set upload folder path 
	
	$fileExt = strtolower(pathinfo($fileName,PATHINFO_EXTENSION)); // get image extension
		
	// valid image extensions
	$valid_extensions = array('jpeg', 'jpg', 'png', 'gif'); 
					
	// allow valid image file formats
	if(in_array($fileExt, $valid_extensions))
	{				
		//check file not exist our upload folder path
		if(!file_exists($upload_path . $fileName))
		{
			// check file size '5MB'
			if($fileSize < 2000000000000000){
			$fileName = md5($fileName);
			//$fileName=str_replace($fileName, ' ', '');
				move_uploaded_file($tempPath, $upload_path . $fileName.'.'.$fileExt); // move file from system temporary path to our upload folder path 
			}
			else{		
				$errorMSG = json_encode(array("message" => "Sorry, your file is too large, please upload 2000 MB size", "status" => false));	
				echo $errorMSG;
			}
		}
		else
		{		
			$errorMSG = json_encode(array("message" => "Sorry, file already exists check upload folder", "status" => false));	
			echo $errorMSG;
		}
	}
	else
	{		
		$errorMSG = json_encode(array("message" => "Sorry, only JPG, JPEG, PNG & GIF, MP4, AVI files are allowed", "status" => false));	
		echo $errorMSG;		
	}
}
		
// if no error caused, continue ....
if(!isset($errorMSG))
{	
	$url=$fileName.'.'.$fileExt;
	$query =  mysqli_query($conn,'INSERT into lib_images (name) VALUES("'.$url.'")');
			
	echo json_encode(array("message" => "Image Uploaded Successfully", "status" => true,"namefie" => "".$fileName.'.'.$fileExt));	
}

?>