//Khi load form len thi cac nut lưu  và sữa sẽ mờ
var flagUSERS=0;//Chưa có thao tác nào

var mangusers=[];
$(document).ready(function(){
	
	builddsUSERS(0,record);
	$(".btnthemuser").click(function () {
		$(".btnthemuser").prop('disabled', true);
		$(".btnluuuser").prop('disabled', false);
	    $(".btnsuauser").prop('disabled', true);
		resetViewFormUSERS();
		$('.txtusername').focus();
		flagUSERS=1;//Thêm
			
	});
	$(".btnsuauser").click(function () {
		$(".btnthemuser").prop('disabled', true);
		$(".btnluuuser").prop('disabled', false);
	    $(".btnsuauser").prop('disabled', true);
		
		$(".txtusername").prop('disabled', true);
		flagUSERS=2;//update
		
	});
	$(".btnlamlaiuser").click(function () {
		resetViewFormUSERS();
		$(".btnthemuser").prop('disabled', false);
		$(".btnluuuser").prop('disabled', true);
	    $(".btnsuauser").prop('disabled', true);
		flagUSERS=0;
		$(".txtusername").prop('disabled', false);
	});
	$(".btnluuuser").click(function () {
		if(flagUSERS==1)
		{
			
			var username=$(".txtusername").val();
			var fullname=$(".txtfullname").val();
			var gender=$(".cbgender").val();
			var phone=$(".txtphone").val();
			var address=$(".txtaddress").val();
			var p=$(".cbidquyen").val();
			var datasend = {
                        event: "insertUSER",
                        username:username,
						fullname:fullname,
						gender:gender,
						phone:phone,
						address:address,
						permission:p,
						avatar:""

                    };
			if(username=="")
			{
				alert_info("Tên đăng nhập Không thể trống");
				$(".txtusername").focus();
			}else if(fullname==""){
				alert_info("Tên đầy đủ Không thể trống");
				$(".txtfullname").focus();
			}else{
				console.log(datasend);
				queryData("php/api.php",datasend, function (data) {
										console.log(data);
						if(data.success==0){
							alert_info("Thêm dữ liệu Thất bại !!");
						}	
                        else if(data.success==1){
							$(".btnthemuser").prop('disabled', false);
							$(".btnluuuser").prop('disabled', true);
							$(".btnsuauser").prop('disabled', true);
							resetViewFormUSERS();
							flagUSERS=0;
							alert_info("Thêm dữ liệu Thành công !!");
							builddsUSERS(pagecurrent_user,record);
                        }else if(data.success==2){
							alert_info("Đã trùng tên đăng nhập!!");
							
						}
						else{
                            alert_info("Thất bại. Xin vui lòng thực hiện sau!!");
                        }
                    });
			}
				
		}else if(flagUSERS==2){
			
			var username=$(".txtusername").val();
			var fullname=$(".txtfullname").val();
			var gender=$(".cbgender").val();
			var phone=$(".txtphone").val();
			var address=$(".txtaddress").val();
			var p=$(".cbidquyen").val();
			var datasend = {
                        event: "updateUSER",
                        username:username,
						fullname:fullname,
						gender:gender,
						phone:phone,
						address:address,
						permission:p,
						avatar:""

                    };
			if(username=="")
			{
				alert_info("Tên đăng nhập Không thể trống");
				$(".txtusername").focus();
			}else if(fullname==""){
				alert_info("Tên đầy đủ Không thể trống");
				$(".txtfullname").focus();
			}else{
				
				queryData("php/api.php",datasend, function (data) {
										
						if(data.success==0){
							alert_info("Cập nhật dữ liệu Thất bại !!");
						}	
                        else if(data.success==1){
							alert_info("Cập nhật dữ liệu Thành công !!");
							$(".btnthemuser").prop('disabled', false);
							$(".btnluuuser").prop('disabled', true);
							$(".btnsuauser").prop('disabled', true);
							flagUSERS=0;
							builddsUSERS(pagecurrent_user,record);
                        }
						else{
                            alert_info("Thất bại. Xin vui lòng thực hiện sau!!");
                        }
                    });
			}
				
		}else{
			console.log("Chưa chọn thao tác");
		}
	});
	var pagecurrent_user=0;
	$(".numberpageuser").on('click','button',function () {  
		pagecurrent_user=$(this).val();
		builddsUSERS($(this).val(),record);
	})
	$(".addListUSER").on('click','.click_xoa_users',function () {
		var vt=($(this).parent().parent().attr("data-vt"));
		var iduser=mangusers[vt].iduser;
		var username=mangusers[vt].username;
		var fullname=mangusers[vt].fullname;
	 bootbox.confirm("Bạn có chắc xóa thành viên:[ "+fullname+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteUSER",
                iduser:iduser
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsUSERS(pagecurrent_user,record);
					resetViewFormUSERS();
			  }else if(data.success==2){
				  alert_info("Thành viên đã được sử dụng");
			  }else{
				  alert_error("Xóa lỗi");
			  }
               
				
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
    });
	});
	$(".addListUSER").on('click','.click_reset_pass_users',function () {
		var vt=($(this).parent().parent().attr("data-vt"));
		var iduser=mangusers[vt].iduser;
		var username=mangusers[vt].username;
		var fullname=mangusers[vt].fullname;
	 bootbox.confirm("Bạn có chắc phục hồi mật khẩu mặc định thành viên:[ "+fullname+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "resetPassUSER",
                username:username
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsUSERS(pagecurrent_user,record);
					resetViewFormUSERS();
			  }else if(data.success==2){
				  alert_info("Thành viên đã được sử dụng");
			  }else{
				  alert_error("Xóa lỗi");
			  }
               
				
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
    });
	});
	$(".btnxoauser").on('click',function () {
		var iduser=$(".txtiduser").val();
		var username=$(".txtusername").val();
		var fullname=$(".txtfullname").val();
	 bootbox.confirm("Bạn có chắc xóa thành viên:[ "+fullname+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteUSER",
                iduser:iduser
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsUSERS(pagecurrent_user,record);
					resetViewFormUSERS();
					 alert_info("Đã xóa thành công");
			  }else if(data.success==2){
				  alert_info("Thành viên đã được sử dụng");
			  }else{
				  alert_error("Xóa lỗi");
			  }
               
				
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
    });
	})
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.btnfinduser').click(function(){
		
		builddsUSERS(0,record);
	});
	
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.txtfinduser').keypress(function(e){
		if(e.which==13){
		
		builddsUSERS(0,record);
		}
	});
	$('.addListUSER').on('click','td',function(e){
		$(this).parent().css("background-color","lightgray");
		$(this).parent().siblings().css("background-color","white");
		var iduser=($(this).parent().attr("data-iduser"));
		var username=($(this).parent().attr("data-username"));
		var fullname=($(this).parent().attr("data-fullname"));
		var phone=($(this).parent().attr("data-phone"));
		var address=($(this).parent().attr("data-address"));
		var p=($(this).parent().attr("data-permission"));
		var gender=($(this).parent().attr("data-gender"));
		$('.txtiduser').val(iduser);
		$('.txtusername').val(username);
		$('.txtfullname').val(fullname);
		$('.txtphone').val(phone);
		$('.txtaddress').val(address);
		$('.cbgender').val(gender);
		$('.cbidquyen').val(p);
		flagUSERS=0;
		
		$(".btnsuauser").prop('disabled', false);
		$(".btnthemuser").prop('disabled', true);
		$(".btnluuuser").prop('disabled', true);
	});
});

function builddsUSERS(page,record) {
	
  
   var find=$(".txtfinduser").val();
   
    var dataSend={
		event:"getUSERS",
		page:page,
        record:record,
		
		search:find
		
    }
    
  $(".addListUSER").html('<img src="images/loading.gif" width=100px height=100px />');						
					
	
    queryData("php/api.php",dataSend,function (res) {
   
            $(".addListUSER").html("");
			buildHTMLUSERS(res);
      
    });
	
	 
}

function buildHTMLUSERS(res) {
     if(res.total==0){
	    $(".addListUSER").html("<tr><td colspan='4'>Chưa có cập nhật nội dung</td></tr>");
		$(".numberpageuser").html("");
   }else{ 
    var data = res.items;
	mangusers=data;	
	var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(record,currentpage);
    var html='';
	
    for (item in data) {
        var list=data[item];
		var gt="Nam"
		if(list.gender==0){
			gt="Nữ"
		}
		var q="Quản trị"
		if(list.permission==1){
			q="Biên tập"
		}else if(list.permission==2){
			q="Thu thập"
		}
        html=html +
            '<tr data-gender="' + list.gender + '" data-iduser="' + list.iduser + '" data-permission="' + list.permission + '"  data-username="' + list.username + '" data-fullname="' + list.fullname + '"   data-vt="' + item + '" data-phone="' + list.phone + '" data-address="' + list.address + '">' +		
            '<td >' + stt + '</td>' +
			'<td >' + list.username +'</td>'+
			'<td >' + list.fullname +'</td>'+
			'<td >' + gt +'</td>'+
			'<td >' + list.phone +'</td>'+
			'<td >' + list.address +'</td>'+
			'<td >' + q +'</td>'+
			'<td ><span class="badge bg-danger click_xoa_users"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span>&nbsp;<span class="badge bg-danger click_reset_pass_users"><i class="fa fa-window-restore" aria-hidden="true"></i>&nbsp;Reset Password</span></td>'+
			
            '</tr>';
        stt++;
		
        $(".addListUSER").html(html)
    }
    buildSlidePage($(".numberpageuser"),5,res.page,res.totalpage);
   }
}
function resetViewFormUSERS(){
		$('.txtusername').val("");
		$('.txtfullname').val("");
		$('.txtphone').val("");
		$('.txtaddress').val("");
		$('.cbgender').val("1");
		$('.cbidquyen').val("2");
	}
	
