<?php

  require_once("server.php");
       
                    $id=$_POST['id'];
					$name=$_POST['name'];
                    $sql="update topic set name='".$name."' where id='".$id."'";
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
                   
?>