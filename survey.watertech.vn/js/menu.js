$(document).ready(function() {
	init()
	showCBAreaTK("cbareatk")
	myUser=JSON.parse(localStorage.getItem("useradv"));
	
	var avartar=localStorage.getItem("avartaradv");
	
	if(myUser==undefined || myUser==null||myUser==""){
	}else{
	}

	$(".menu_tk_area").click(function(){
		swapMain("frmtk_area");
		
	});
	$(".menuxembando").click(function(){
		location.href ="mapview.html";
	});
    $(".menuusers").click(function(){
        swapMain("frmusers");
		$(".frmduan").addClass("is-hidden");
      
        
		$(".btnluuuser").prop("disabled",true); 
		$(".btnthemuser").prop("disabled",false); 
		$(".btnsuauser").prop("disabled",true); 
	
    })
	// $(".menuda").click(function(){
    //     swapMain("frmduan");
    //     var h='<li class="breadcrumb-item"><a href="#">Thiết lập</a></li>'+
    //            '<li class="breadcrumb-item active">Các dự án</li>';
    //     $(".addbreadcrumb").html(h);
	// 	$(".btnluuda").prop("disabled",true); 
	// 	$(".btnthemda").prop("disabled",false); 
	// 	$(".btnsuada").prop("disabled",true); 
	
    // })
    // $(".menupc").click(function(){
	// 	$(".btnluujoin").prop("disabled",true); 
	// 	$(".btnthemjoin").prop("disabled",false); 
	// 	$(".btnsuajoin").prop("disabled",true); 
	
		
    //     swapMain("frmajoinpro");
    //     var h='<li class="breadcrumb-item"><a href="#">Tác nghiệp</a></li>'+
    //            '<li class="breadcrumb-item active">Danh sách các nhân viên phân công</li>';
    //     $(".addbreadcrumb").html(h);
	// 	showCBProJoin();
	// 	showCBAreaProJoin();
		
	// 	showCBUsersProJoin();
	// 	builddsJoin(0,record);
	
    // })
	$(".menuarea").click(function(){
		$(".btnluuarea").prop("disabled",true); 
		$(".btnthemarea").prop("disabled",false); 
		$(".btnsuaarea").prop("disabled",true); 
		
        swapMain("frmarea");
        var h='<li class="breadcrumb-item"><a href="#">Thiết lập</a></li>'+
               '<li class="breadcrumb-item active">Lĩnh vực khảo sát</li>';
        $(".addbreadcrumb").html(h);
		//showCBPro();
		builddsAreas(0,record);
    })
	$(".btn_change_matkhau").click(function() {
	
	$('.showmodalchangematkhau').modal('show');
	
	});
	$(".btn_change_pass").click(function() {
	var txtpassnew=$('.txtpassnew').val();
	var txtpassnewagain=$('.txtpassnewagain').val();
	if(txtpassnew==""||txtpassnewagain=="")
	{
		alert_info("Mật khẩu không được trống");
	}
	else if(txtpassnew!=txtpassnewagain){
		alert_info("Mật khẩu cũ và mới không khớp");
	}else{
		 var dataSend={
		event:"updatepass",
		pass:txtpassnew,
		
		username:localStorage.getItem("usernamesurveytlus")
		}
			console.log(dataSend);
		$(".progesschangepass").html("<img src='images/loading.gif' width='5px' height='5px'/>");
  
			queryData("php/api.php",dataSend,function (res) {
				
				if(res["success"]==1){
					
					alert_info("Thay đổi mật khẩu thành công");
					$('.showmodalchangematkhau').modal('hide');
				}else
				{
					alert_info("Thay đổi mật khẩu thất bại");
				}
					
          $(".progesschangepass").html("");
			})
	}
	});

 });
 function init(){
	$(".btnluujoin").prop("disabled",true); 
	$(".btnthemjoin").prop("disabled",false); 
	$(".btnsuajoin").prop("disabled",true); 
	//showCBProJoin();
	//showCBAreaProJoin();	
//	showCBUsersProJoin();
//	buildUserDropdown();//hàm để hiện thị user và hình trong trang index.
	swapMain("frmtk_area");
 }