<?php
require_once("server.php"); //gọi đoạn từ file server.php
$event=$_POST['event']; 

switch ($event) {
	case "login":
	$mang=array();
		$username=$_POST['username'];
		$password=sha1($_POST['password']);
        $rs=mysqli_query($conn,"select * from users u where  username='".$username."' and `password`='".$password."'");
		if(mysqli_num_rows($rs)>0){
		while ($rows=mysqli_fetch_array($rs)){       
            $usertemp['iduser']=$rows['iduser']; 
            $usertemp['username']=$rows['username'];
           // $usertemp['password']=$rows['password'];			
			$usertemp['fullname']=$rows['fullname'];
			$usertemp['address']=$rows['address'];
			$usertemp['avatar']=$rows['avatar'];			
			$usertemp['permission']=$rows['permission'];
			$usertemp['gender']=$rows['gender'];
			$usertemp['phone']=$rows['phone'];
		    array_push($mang,$usertemp);
		}	
        $jsondata['success'] =1;		
        $jsondata['items'] =$mang;		
        echo json_encode($jsondata);
		}
		else{
		$jsondata['success'] =0;		
        $jsondata['items'] =$mang;
		echo json_encode($jsondata);
		}
        mysqli_close($conn);
        break;
	case "updatepass":
		$username=$_POST['username'];
		$pass=sha1($_POST['pass']);
        $sql="update `users` set password='$pass' where username='".$username."'";
		 
            if (mysqli_query($conn,$sql)) {
				if(mysqli_affected_rows($conn)>0){
					$res["success"] = 1;
				}
				else
				{
					$res["success"] = 0;
				}
            } else {
                $res["success"] = 0;
            }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getALLUsers":
            $mang=array();
            
            $sql=mysqli_query($conn,"select iduser, username,fullname from users"); 
         
           while($rows=mysqli_fetch_array($sql))
            {
             $usertemp['iduser']=$rows['iduser'];
                $usertemp['username']=$rows['username'];
                $usertemp['fullname']=$rows['fullname'];
              
                array_push($mang,$usertemp); 
            }
           
            $jsonData['items'] =$mang;
            echo json_encode($jsonData);
            mysqli_close($conn);
            break;
    case "getUSERS":
            $mang=array();
            $record=$_POST['record'];
            $page=$_POST['page'];
            $search=$_POST['search'];
            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"select iduser,gender, phone, username,fullname,address,phone,avatar,permission from users where  (username like '%".$search."%' or fullname like '%".$search."%') order by username asc ".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
				$usertemp['iduser']=$rows['iduser'];
                $usertemp['username']=$rows['username'];
                $usertemp['fullname']=$rows['fullname'];
                $usertemp['address']=$rows['address'];
                $usertemp['avatar']=$rows['avatar'];
                $usertemp['permission']=$rows['permission'];
                $usertemp['gender']=$rows['gender'];
                $usertemp['phone']=$rows['phone'];
                array_push($mang,$usertemp);
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from users where  (username like '%".$search."%' or  fullname like '%".$search."%') order by username asc ");
            $row=mysqli_fetch_array($rs);
            $jsonData['total'] =(int)$row['total'];
            $jsonData['totalpage'] =ceil($row['total']/$record);
            $jsonData['page'] =(int)$page;
            $jsonData['items'] =$mang;
            echo json_encode($jsonData);
            mysqli_close($conn);
            break;
    case "insertUSER":
	
                $username=$_POST['username'];
                $fullname=$_POST['fullname'];   
                $gender=$_POST['gender'];
				$phone=$_POST['phone']; 
				$address=$_POST['address']; 
				$avatar=$_POST['avatar']; 				
                $pass=sha1('1234567');
                $permission=$_POST['permission']; 
                $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  users where username='".$username."' ");
                $row=mysqli_fetch_array($rs);
                if((int)$row['total']>0){
                     $res["success"] = 2;
                }else{
                $sql="INSERT INTO `users`(username,password,fullname,phone,address,gender,avatar,permission) VALUES ('".$username."','".$pass."','".$fullname."','".$phone."','".$address."','".$gender."','".$avatar."','".$permission."')";
              
               
                    if (mysqli_query($conn, $sql)) {
                        if(mysqli_affected_rows($conn)>0){
                            
                        $res["success"] = 1;
                        }
                        else{
                            $res["success"] = 0;
                        }
                    } else {
                        $res["success"] = 0;
                    }
                }
                echo  json_encode($res);
                mysqli_close($conn);
                break;
    case "deleteUSER":       
                    $iduser=$_POST['iduser'];
                    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  area_join_users  where iduser='".$iduser."' ");
                    $row=mysqli_fetch_array($rs);
                     if((int)$row['total']>0){
                          $res["success"] = 2;
                     }
                     else{
                     
                         $sql="DELETE FROM users WHERE iduser='".$iduser."'";
                    
                         if (mysqli_query($conn, $sql)) {
                             if(mysqli_affected_rows($conn)>0){
                             
                             $res["success"] = 1;
                             } else {
                             $res["success"] = 0;
                             }
                     }
                     }
                     echo json_encode($res);
                     mysqli_close($conn);
                     break;  
					 
    case "updateUSER":
				$username=$_POST['username'];
                $fullname=$_POST['fullname'];   
                $gender=$_POST['gender'];
				$phone=$_POST['phone']; 
				$address=$_POST['address']; 
				$avatar=$_POST['avatar']; 				
                $pass=sha1('1234567');
                $permission=$_POST['permission']; 
                        
                        $sql="UPDATE users SET  fullname='".$fullname."',phone='".$phone."',address='".$address."',gender='".$gender."',permission='".$permission."' WHERE username='".$username."'";
                            if (mysqli_query($conn, $sql)) {
                                if(mysqli_affected_rows($conn)>0){
                                $res["success"] = 1;
                                }else{
                                $res["success"] = 0;
                                }
                            } else {
                                $res["success"] = 0;
                            }
                        
                        echo json_encode($res);
                        mysqli_close($conn);
                        break;
	case "resetPassUSER":
				$username=$_POST['username'];         			
                $pass=sha1('1234567');
                       
                        $sql="UPDATE users SET  password='".$pass."' WHERE username='".$username."'";
                            if (mysqli_query($conn, $sql)) {
                                if(mysqli_affected_rows($conn)>0){
                                $res["success"] = 1;
                                }else{
                                $res["success"] = 0;
                                }
                            } else {
                                $res["success"] = 0;
                            }
                        
                        echo json_encode($res);
                        mysqli_close($conn);
                        break;
    case "getDA":
            $mang=array();
            $record=$_POST['record'];
            $page=$_POST['page'];
            $search=$_POST['search'];
            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"select idpro,namepro,beginpro,endpro from project where (idpro like '%".$search."%' or namepro like '%".$search."%') order by idpro asc ".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
             
                $usertemp['idpro']=$rows['idpro'];
                $usertemp['namepro']=$rows['namepro'];
               $usertemp['endpro']=$rows['endpro'];
			   $usertemp['beginpro']=$rows['beginpro'];
                array_push($mang,$usertemp);
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from project where (idpro like '%".$search."%' or  namepro like '%".$search."%') order by idpro asc ");
            $row=mysqli_fetch_array($rs);
            $jsonData['total'] =(int)$row['total'];
            $jsonData['totalpage'] =ceil($row['total']/$record);
            $jsonData['page'] =(int)$page;
            $jsonData['items'] =$mang;
            echo json_encode($jsonData);
            mysqli_close($conn);
            break;
    case "deleteDA":       
                $mada=$_POST['mada'];
                $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  area  where idpro='".$mada."' ");
                $row=mysqli_fetch_array($rs);
                 if((int)$row['total']>0){
                      $res["success"] = 2;
                 }
                 else{
                 
                     $sql="DELETE FROM project WHERE idpro ='".$mada."'";
                
                     if (mysqli_query($conn, $sql)) {
                         if(mysqli_affected_rows($conn)>0){
                         
                         $res["success"] = 1;
                         } else {
                         $res["success"] = 0;
                         }
                 }
                 }
                 echo json_encode($res);
                 mysqli_close($conn);
                 break;   
    case "insertDA":
	
                    $mada=$_POST['mada'];
                    $tenda=$_POST['tenda'];   
                    $nambd=$_POST['nambd'];
					$namkt=$_POST['namkt'];  					
                    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  project where idpro ='".$mada."' ");
                    $row=mysqli_fetch_array($rs);
                    if((int)$row['total']>0){
                         $res["success"] = 2;
                    }else{
                    $sql="INSERT INTO `project`(`idpro`, `namepro`,`beginpro`,`endpro`) VALUES ('".$mada."','".$tenda."','".$nambd."','".$namkt."')";
                  
                   
                        if (mysqli_query($conn, $sql)) {
                            if(mysqli_affected_rows($conn)>0){
                                
                            $res["success"] = 1;
                            }
                            else{
                                $res["success"] = 0;
                            }
                        } else {
                            $res["success"] = 0;
                        }
                    }
                    echo json_encode($res);
                    mysqli_close($conn);
                    break;
    case "updateDA":
                    $mada=$_POST['mada'];
                    $tenda=$_POST['tenda'];   
                    $nambd=$_POST['nambd'];
					$namkt=$_POST['namkt'];  
                        
                        $sql="UPDATE project SET namepro='".$tenda."',beginpro='".$nambd."',endpro='".$namkt."' WHERE idpro='".$mada."'";
                            if (mysqli_query($conn, $sql)) {
                                if(mysqli_affected_rows($conn)>0){
                                $res["success"] = 1;
                                }else{
                                $res["success"] = 0;
                                }
                            } else {
                                $res["success"] = 0;
                            }
                        
                        echo json_encode($res);
                        mysqli_close($conn);
                        break;
	
	
	
   case "getAllPro":
                    $mang=array();            
                    $sql=mysqli_query($conn,"SELECT idpro,namepro,beginpro,endpro,year(beginpro) as nambd FROM project order by year(beginpro) desc "); 
                    while($rows=mysqli_fetch_array($sql))
                    {                
                        $usertemp['idpro']=$rows["idpro"];
						$usertemp['namepro']=$rows["namepro"];
						
						$usertemp['beginpro']=$rows["beginpro"];
						$usertemp['endpro']=$rows["endpro"];
						$usertemp['nambd']=$rows["nambd"];
										
                        array_push($mang,$usertemp);
                    }
                   
                     $jsondata['items'] =$mang;	
					echo json_encode($jsondata);
                    mysqli_close($conn);
                    break;
	
	 case "getAllAreaByPro":
					//$idpro=$_POST['idpro']; 
                    $mang=array();            
                    $sql=mysqli_query($conn,"SELECT idarea,namearea,iconarea  FROM area  order by idarea desc "); 
                    while($rows=mysqli_fetch_array($sql))
                    {                
                        $usertemp['idarea']=$rows["idarea"];
						$usertemp['namearea']=$rows["namearea"];
						
						$usertemp['iconarea']=$rows["iconarea"];				
                        array_push($mang,$usertemp);
                    }
                   
                     $jsondata['items'] =$mang;	
					echo json_encode($jsondata);
                    mysqli_close($conn);
                    break;
	case "insertAREA":
	
            $idarea=$_POST['idarea']; //lấy mạ loại mặt hàng từ client gửi lên và gán vào biến tên malmh
            $namearea=$_POST['namearea']; 
          //  $idpro=$_POST['idpro']; 
            $iconarea=$_POST['iconarea']; 
             					
                    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  area_joinpro_users where idarea ='".$idarea."' ");
                    $row=mysqli_fetch_array($rs);
                    if((int)$row['total']>0){
                         $res["success"] = 2;
                    }else{
                  
                   // $sqlinsert="insert into area(idarea,namearea,idpro,iconarea) values('".$idarea."','".$namearea."','".$idpro."','".$iconarea."')";
            $sqlinsert="insert into area(idarea,namearea,iconarea) values('".$idarea."','".$namearea."','".$iconarea."')";
           
                        if (mysqli_query($conn, $sqlinsert)) {
                            if(mysqli_affected_rows($conn)>0){
                                
                            $res["success"] = 1;
                            }
                            else{
                                $res["success"] = 0;
                            }
                        } else {
                            $res["success"] = 0;
                        }
                    }
                    echo json_encode($res);
                    mysqli_close($conn);
                    break;
    
   case "getArea":
            $mang=array();
            $record=$_POST['record'];
            $page=$_POST['page'];
            $search=$_POST['search'];
            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"select a.idarea,a.namearea,a.iconarea from area a where   (a.idarea like '%".$search."%' or a.namearea like '%".$search."%') order by a.idarea asc ".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
				$usertemp['idarea']=$rows['idarea'];
                $usertemp['namearea']=$rows['namearea'];
               
				
                $usertemp['iconarea']=$rows['iconarea'];
                
                array_push($mang,$usertemp);
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from area a  where    (a.idarea like '%".$search."%' or  a.namearea like '%".$search."%') order by a.idarea asc ");
            $row=mysqli_fetch_array($rs);
            $jsonData['total'] =(int)$row['total'];
            $jsonData['totalpage'] =ceil($row['total']/$record);
            $jsonData['page'] =(int)$page;
            $jsonData['items'] =$mang;
            echo json_encode($jsonData);
            mysqli_close($conn);
            break;
     case "deleteArea":       
                    $idarea=$_POST['idarea'];
                    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  area_join_users  where idarea='".$idarea."' ");
                    $row=mysqli_fetch_array($rs);
                     if((int)$row['total']>0){
                          $res["success"] = 2;
                     }
                     else{
                     
                         $sql="DELETE FROM area WHERE idarea='".$idarea."'";
                    
                         if (mysqli_query($conn, $sql)) {
                             if(mysqli_affected_rows($conn)>0){
                             
                             $res["success"] = 1;
                             } else {
                             $res["success"] = 0;
                             }
                     }
                     }
                     echo json_encode($res);
                     mysqli_close($conn);
                     break;  
   case "updateArea":
			$idarea=$_POST['idarea']; //lấy mạ loại mặt hàng từ client gửi lên và gán vào biến tên malmh
            $namearea=$_POST['namearea']; 
          //  $idpro=$_POST['idpro']; 
            $iconarea=$_POST['iconarea']; 
             	 $sql="UPDATE area SET  namearea='".$namearea."',iconarea='".$iconarea."' WHERE idarea='".$idarea."'";
                          
                        
                   //     $sql="UPDATE area SET  namearea='".$namearea."',idpro='".$idpro."',iconarea='".$iconarea."' WHERE idarea='".$idarea."'";
                            if (mysqli_query($conn, $sql)) {
                                if(mysqli_affected_rows($conn)>0){
                                $res["success"] = 1;
                                }else{
                                $res["success"] = 0;
                                }
                            } else {
                                $res["success"] = 0;
                            }
                        
                        echo json_encode($res);
                        mysqli_close($conn);
                        break;
	case "insertJoin":
			$idpro=$_POST['idpro'];
            $idarea=$_POST['idarea']; //lấy mạ loại mặt hàng từ client gửi lên và gán vào biến tên malmh
            $iduser=$_POST['iduser']; 
            $startjoin=$_POST['startjoin']; 
            $endjoin=$_POST['endjoin']; 
            
             	 					
                    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  area_joinpro_users where idarea ='".$idarea."' and iduser ='".$iduser."' and datebeginjoin ='".$startjoin."' and dateendjoin ='".$endjoin."' ");
                    $row=mysqli_fetch_array($rs);
                    if((int)$row['total']>0){
                         $res["success"] = 2;
                    }else{
					//$idpc=$idpro."_".$idarea."_".$iduser."_".$startjoin."_".$endjoin;
                    $sqlinsert="insert into area_joinpro_users(idpro,idarea,iduser,datebeginjoin,dateendjoin) values('".$idpro."','".$idarea."','".$iduser."','".$startjoin."','".$endjoin."')";
           
                        if (mysqli_query($conn, $sqlinsert)) {
                            if(mysqli_affected_rows($conn)>0){
                                
                            $res["success"] = 1;
                            }
                            else{
                                $res["success"] = 0;
                            }
                        } else {
                            $res["success"] = 0;
                        }
                    }
                    echo json_encode($res);
                    mysqli_close($conn);
                    break;
    case "getAreaJoin":
            $mang=array();
            $record=$_POST['record'];
            $page=$_POST['page'];
            $search=$_POST['search'];
            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"select distinct j.idarea,j.datebeginjoin,j.dateendjoin,(select namearea from area a where a.idarea=j.idarea) as namearea,(select namepro from project p where p.idpro=j.idpro) as namepro, (select count(*) from area_joinpro_users f where f.idpro=j.idpro and f.idarea=j.idarea) as SLUSER from area_joinpro_users j where  (j.idarea like '%".$search."%' or j.iduser like '%".$search."%') order by j.idassign asc ".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
				//$usertemp['idassign']=$rows['idassign'];
                #$usertemp['iduser']=$rows['iduser'];
                $usertemp['idarea']=$rows['idarea'];
				$usertemp['datebeginjoin']=$rows['datebeginjoin'];
                $usertemp['dateendjoin']=$rows['dateendjoin'];
				$usertemp['namearea']=$rows['namearea'];
				$usertemp['namepro']=$rows['namepro'];
				$usertemp['SLUSER']=$rows['SLUSER'];
                array_push($mang,$usertemp);
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from area_joinpro_users j  where (j.idarea like '%".$search."%' or  j.iduser like '%".$search."%') order by j.idassign asc ");
            $row=mysqli_fetch_array($rs);
            $jsonData['total'] =(int)$row['total'];
            $jsonData['totalpage'] =ceil($row['total']/$record);
            $jsonData['page'] =(int)$page;
            $jsonData['items'] =$mang;
            echo json_encode($jsonData);
            mysqli_close($conn);
            break;
	//API Dùng để load các user đã đăng nhập và phan cong
	 case "getAreaIsPhanCong":
					$iduser=$_POST['iduser']; 
                    $mang=array();            
                    $sql=mysqli_query($conn,"SELECT ua.idassign, a.idarea,a.namearea,p.idpro,p.namepro,ua.iduser  FROM area_joinpro_users ua, project p,area a where a.idarea=ua.idarea and ua.idpro=p.idpro and ua.iduser='".$iduser."'"); 
                    while($rows=mysqli_fetch_array($sql))
                    {                
                        $usertemp['idarea']=$rows["idarea"];
						$usertemp['namearea']=$rows["namearea"];
						$usertemp['namepro']=$rows["namepro"];
						$usertemp['idpro']=$rows["idpro"];
						$usertemp['iduser']=$rows["iduser"];	
						$usertemp['idassign']=$rows["idassign"];						
                        array_push($mang,$usertemp);
                    }
                   
                     $jsondata['items'] =$mang;	
					echo json_encode($jsondata);
                    mysqli_close($conn);
                    break;
    case "getALLAreaData":
                        $mang=array();            
                        $sql=mysqli_query($conn,"SELECT *   FROM area"); 
                        while($rows=mysqli_fetch_array($sql))
                        {                
                            $usertemp['idarea']=$rows["idarea"];
                            $usertemp['namearea']=$rows["namearea"];
                            $usertemp['iconarea']=$rows["iconarea"];
                           					
                            array_push($mang,$usertemp);
                        }
                       
                         $jsondata['items'] =$mang;	
                        echo json_encode($jsondata);
                        mysqli_close($conn);
                        break;
    case "insertDataCollected":
	
        $iduser=$_POST['iduser'];
        $idarea=$_POST['idarea'];
        $idprovince=$_POST['idprovince'];
        $iddistrict=$_POST['iddistrict'];
        $idward=$_POST['idward'];
        $address=$_POST['address'];
        $namecommon=$_POST['namecommon'];
        $data=$_POST['data'];
        $toadochung=$_POST['toadochung'];     
        $sql="INSERT INTO `dataarea`(iduserchange,namecommon,idprovince,iddistrict,idward,address,`iduser`,idarea, `data`,toadopoint) VALUES ('".$iduser."','".$namecommon."','".$idprovince."','".$iddistrict."','".$idward."','".$address."','".$iduser."','".$idarea."','".$data."','".$toadochung."')";
        if (mysqli_query($conn, $sql)) {
            if(mysqli_affected_rows($conn)>0){                
                $res["success"] = 1;
            }
            else{
                $res["success"] = 0;
            }
        } else {
                $res["success"] = 0;
        }                        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    //update 
    case "UpdateDataCollected":
        $namecommon=$_POST['namecommon'];
        $id=$_POST['id'];
        $iduserchange=$_POST['iduserchange'];
        
        $idarea=$_POST['idarea'];
        $idprovince=$_POST['idprovince'];
        $iddistrict=$_POST['iddistrict'];
        $idward=$_POST['idward'];
        $address=$_POST['address'];
        $data=$_POST['data'];
        $toadochung=$_POST['toadochung'];   
        
        $sql="update dataarea set namecommon='".$namecommon."',idprovince='".$idprovince."',iddistrict='".$iddistrict."',idward='".$idward."',address='".$address."',iduserchange='".$iduserchange."',idarea='".$idarea."',data='".$data."',toadopoint='".$toadochung."' where id='".$id."'";
        if (mysqli_query($conn, $sql)) {
            if(mysqli_affected_rows($conn)>0){                
                $res["success"] = 1;
            }
            else{
                $res["success"] = 0;
            }
        } else {
                $res["success"] = 0;
        }                        
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getDataIsCollectSearch":
            // $iduser=$_POST['iduser']; 
             $mang=array();
             $mang1=array(); 
             $search=$_POST['search'];
           
             $listarea=$_POST['listarea'];
             $sql=mysqli_query($conn,"SELECT *  FROM dataarea where idarea in $listarea and namecommon like '%".$search."%'");
                
             
             
             
             while($rows=mysqli_fetch_array($sql))
             {         
                 
                 $decoded_json = json_decode($rows["data"], false);
                 $decoded_json->properties->id=$rows["id"];
                 $decoded_json->properties->namecommon=$rows["namecommon"];
                 $decoded_json->properties->address=$rows["address"];
                 $decoded_json->properties->toadopoint=json_decode($rows["toadopoint"], false);
                 array_push($mang,$decoded_json);
                 
                 
             }
             
              $jsondata['type'] ="FeatureCollection";	
              $jsondata['features'] =$mang;
                  
             echo json_encode($jsondata);
             mysqli_close($conn);
             break;
         
    //Lấy thông tin tất cả các data thu thập
    case "getDataIsCollect":
       // $iduser=$_POST['iduser']; 
        $mang=array();
		$mang1=array(); 
        $idprovince=$_POST['idprovince'];
        $iddistrict=$_POST['iddistrict'];
        $idward=$_POST['idward'];
        $listarea=$_POST['listarea'];
        if ($idprovince=="NULL" && ($iddistrict=="NULL" || $iddistrict==null)&& ($idward=="NULL" || $idward==null) ){
            $sql=mysqli_query($conn,"SELECT *  FROM dataarea where idarea in $listarea");
           
        }
        else if ($idprovince!="NULL" && ($iddistrict=="NULL" || $iddistrict==null)&& ($idward=="NULL" || $idward==null) ){
            $sql=mysqli_query($conn,"SELECT *  FROM dataarea where (idarea in $listarea) and idprovince='".$idprovince."'");
        }
        else if ($idprovince!="NULL" && ($iddistrict!="NULL" || $iddistrict!=null)&& ($idward=="NULL" || $idward==null) ){
            $sql=mysqli_query($conn,"SELECT *  FROM dataarea where (idarea in $listarea) and idprovince='".$idprovince."' and iddistrict='".$iddistrict."'");
        }
        else if ($idprovince!="NULL" && ($iddistrict!="NULL" || $iddistrict!=null)&& ($idward!="NULL" || $idward!=null) ){
            $sql=mysqli_query($conn,"SELECT *  FROM dataarea where (idarea in $listarea) and idprovince='".$idprovince."' and iddistrict='".$iddistrict."' and idward='".$idward."'");
        }
        
        while($rows=mysqli_fetch_array($sql))
        {         
            
            $decoded_json = json_decode($rows["data"], false);
            $decoded_json->properties->id=$rows["id"];
            array_push($mang,$decoded_json);
            
			
        }
        
         $jsondata['type'] ="FeatureCollection";	
         $jsondata['features'] =$mang;
			 
        echo json_encode($jsondata);
        mysqli_close($conn);
        break;

    case "deleteDataCollected":       
            $id=$_POST['id'];
           
             
                 $sql="DELETE FROM dataarea WHERE id ='".$id."'";
            
                 if (mysqli_query($conn, $sql)) {
                     if(mysqli_affected_rows($conn)>0){
                     
                     $res["success"] = 1;
                     } else {
                     $res["success"] = 0;
                     }
                }
             
             echo json_encode($res);
             mysqli_close($conn);
             break;  
    //Xu ly
    case "getALLPROVINCE":
       
        $mang=array();            
        $sql=mysqli_query($conn,"SELECT * FROM provinces"); 
        while($rows=mysqli_fetch_array($sql))
        {                
            $usertemp['code']=$rows["code"];
            $usertemp['full_name']=$rows["full_name"];
           				
            array_push($mang,$usertemp);
        }
       
         $jsondata['items'] =$mang;	
        echo json_encode($jsondata);
        mysqli_close($conn);
        break;
    case "getALLDistrictByID":
            $code=$_POST['code'];
            $mang=array();            
            $sql=mysqli_query($conn,"SELECT d.code,d.full_name FROM provinces p,districts d where d.province_code=p.code and d.province_code ='".$code."'"); 
            while($rows=mysqli_fetch_array($sql))
            {                
                $usertemp['code']=$rows["code"];
                $usertemp['full_name']=$rows["full_name"];
                array_push($mang,$usertemp);
            }
           
             $jsondata['items'] =$mang;	
            echo json_encode($jsondata);
            mysqli_close($conn);
            break;
    case "getALLWardByID":
                $code=$_POST['code'];
                $mang=array();            
                $sql=mysqli_query($conn,"SELECT w.code,w.full_name FROM wards  w,districts d where d.code =w.district_code  and w.district_code ='".$code."'"); 
                while($rows=mysqli_fetch_array($sql))
                {                
                    $usertemp['code']=$rows["code"];
                    $usertemp['full_name']=$rows["full_name"];
                    array_push($mang,$usertemp);
                }
               
                 $jsondata['items'] =$mang;	
                echo json_encode($jsondata);
                mysqli_close($conn);
                break;
    case "deleteImage":        
                   $url=$_POST['url'];
                    $doc_root = preg_replace("!${_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']);
                    $absolutePath =$doc_root.'/serverfileupload/'.$url;
                                        if(unlink($absolutePath))
                                            {
                                                //echo 'The file '.$url.' has been deleted';
                                                $res["success"] =1;//{"success":1} //insert thành công
                                                
                                               $query =  mysqli_query($conn,"DELETE FROM  lib_images WHERE name ='".$url."'");
	
                                            }
             
                                            else
                                            {
                                                $res["success"] =0;//{"success":1} //insert thành công
                                                //echo 'The file '.$url.' doesnot exist';
                                            }					
                                   
                            
                        
                           echo json_encode($res); /// trả về json tương ứng cho client
                            
                    break; 
   //////////////
   //Lấy thông tin tất cả các data thu thập thống kê
   case "getDataIsCollectTK":
    // $iduser=$_POST['iduser']; 
     $mang=array();
     $record=$_POST['record'];
     $page=$_POST['page'];
     
     $vt=$page*$record;
     $limit='limit '.$vt.' , '.$record;
     $idprovince=$_POST['idprovince'];
     $iddistrict=$_POST['iddistrict'];
     $idward=$_POST['idward'];
     $idarea=$_POST['idarea'];
     $sqlwhere='';
     if ($idarea!="ALL")
        $sqlwhere.=$sqlwhere." and idarea='".$idarea."'";
    if ($idprovince!="ALL"){
        $sqlwhere.=$sqlwhere." and idprovince='".$idprovince."'";
    }
    if ($iddistrict!="ALL" && $iddistrict!=null){
        $sqlwhere.=$sqlwhere." and iddistrict='".$iddistrict."'";
    }
    if ($idward!="ALL" && $idward!=null){
        $sqlwhere.=$sqlwhere." and idward='".$idward."'";
    }
  
         $sql=mysqli_query($conn,"SELECT *  FROM dataarea d,users u where u.iduser=d.iduser ".$sqlwhere." ".$limit);
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' FROM dataarea d,users u where u.iduser=d.iduser  ".$sqlwhere);
    
    
    while($rows=mysqli_fetch_array($sql))
     {         
         
         $decoded_json = json_decode($rows["data"], false);
         $decoded_json->properties->id=$rows["id"];
         $decoded_json->properties->namecommon=$rows["namecommon"];
         $decoded_json->properties->fullname=$rows["fullname"];
         $decoded_json->properties->datetime=$rows["datetime"];
         $decoded_json->properties->toadopoint=$rows["toadopoint"];
         array_push($mang,$decoded_json);
         
         
     }
     $row=mysqli_fetch_array($rs);
            $jsondata['total'] =(int)$row['total'];
            $jsondata['totalpage'] =ceil($row['total']/$record);
            $jsondata['page'] =(int)$page;
          
      $jsondata['type'] ="FeatureCollection";	
      $jsondata['features'] =$mang;
          
     echo json_encode($jsondata);
     mysqli_close($conn);
     break;
   //////////////
	default:
        break;
    }
 ?>       