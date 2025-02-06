<?php

    require_once("server.php");
	$search=$_POST['search'];
    $sql="SELECT `id`, `name` FROM `topic` where (id like '%".$search."%') or (name like '%".$search."%')";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['id']=$rows["id"];
        $usertemp['name']=$rows["name"];
       
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
   echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
  
   mysqli_close($conn);
?>