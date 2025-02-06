 $(document).ready(function(){
	 

	 var u=localStorage.getItem("usernamesurveytlus");
	 if(u!=null|| u!=""|| u!=undefined){
		var r=	localStorage.getItem("remembersurveytlus");	 
		
		if(r=="true"){
			
			$(".txtemail").val(localStorage.getItem("usernamesurveytlus"));
			$(".txtpass").val(localStorage.getItem("passwordsurveytlus"));
		}
	 }
 
 
 $(".btnlogin").click(function() {
		var username=$(".txtemail").val();
		var pass=$(".txtpass").val();
		if(username==""){
			alert("Nhập tài khoản email");
		}else if(pass=="")
		{
			alert("Nhập Mật khẩu");		
		}else{
			var datasend = {
                        event: "login",
                        username:username,
						password:pass
                    };        							
                    queryData("php/api.php",datasend, function (data) {								
						 if(data.success==1){						
								if ($(".rememberlogin").is(':checked')) {									
									localStorage.setItem("remembersurveytlus", true);
																		
								}else{
									localStorage.removeItem("remembersurveytlus");
									
								}
								localStorage.setItem("usernamesurveytlus", username);
							    localStorage.setItem("passwordsurveytlus", pass);
								localStorage.setItem("avatarsurveytlus", data.items[0].avatar);
								localStorage.setItem("usersurveytlus", JSON.stringify(data));
								localStorage.setItem("permissionsurveytlus", data.items[0].permission);
								location.href="mapview.html";	
						
						 }else
						 {
							 alert("Tài khoản chưa đúng");
							 $(".txtemail").val("");
							 $(".txtpass").val("");
						 }
                        
                    });
		}
});
});

function queryData(url,dataSend,callback){
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'json',
        success: callback
    });
}

function alert_info(mes) {
    bootbox.alert({
        size: "small",
        title: "",
        message: mes,
        callback: function(){ /* your callback code */ }
    });
}