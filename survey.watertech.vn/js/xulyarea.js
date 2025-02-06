var flagAREA=0;//chưa chọn thao tác
var urlimageiconarea="";
var url="https://survey.watertech.vn/";
$(document).ready(function() {
	
	$(".addusername").on('click','.btn_log_out',function(){
		logout();
	});
	var pagecurrent_area=0;
	$(".numberpagearea").on('click','button',function () {  
		pagecurrent_area=$(this).val();
		builddsAreas($(this).val(),record);
	})
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.btnfindarea').click(function(){
		
		builddsAreas(0,record);
	});
	
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.txtfindarea').keypress(function(e){
		if(e.which==13){
		
		builddsAreas(0,record);
		}
	});
	$('.addListAREA').on('click','td',function(e){
		$(this).parent().css("background-color","lightgray");
		$(this).parent().siblings().css("background-color","white");
		var idarea=($(this).parent().attr("data-idarea"));
		var namearea=($(this).parent().attr("data-namearea"));
		var idpro=($(this).parent().attr("data-idpro"));
		var iconarea=($(this).parent().attr("data-iconarea"));
	
		$('.txtidarea').val(idarea);
		$('.txtnamearea').val(namearea);
		$('.cbpro').val(idpro);
		
		console.log(iconarea)
		$(".imgiconarea").removeClass("is-hidden"); 
		$('#imgPreviewarea').attr("src",url+"serverfileupload/"+iconarea);
		flagAREA=0;
		
		$(".btnsuaarea").prop('disabled', false);
		$(".btnthemarea").prop('disabled', true);
		$(".btnluuarea").prop('disabled', true);
	});

    $(".btnthemarea").click(function(){
        flagAREA=1;
		$(".btnthemarea").prop("disabled",true); 
	
		$(".btnluuarea").prop("disabled",false);
	
		$(".txtidarea").focus();
		resetViewAREA();
		
		document.querySelector("#imgiconarea").addEventListener('change', initUploadAllCommonIConArea);	
    })
	$(".btnsuaarea").click(function () {
		$(".btnthemarea").prop('disabled', true);
		$(".btnluuarea").prop('disabled', false);
	    $(".btnsuaarea").prop('disabled', true);
		$(".txtnamearea").focus()
		$(".txtidarea").prop('disabled', true);
		flagAREA=2;//update
		document.querySelector("#imgiconarea").addEventListener('change', initUploadAllCommonIConArea);	
  
	});
    $(".btnlamlaiarea").click(function(){
		$(".btnthemarea").prop("disabled",false); 
		
		$(".btnluuarea").prop("disabled",true);
		$(".txtidarea").prop("disabled",false);//
		resetViewAREA();
		flagAREA=0;
	});
	
	// $(".addListAREA").on('click','.click_xoa_area',function () {
	// 		var idarea=($(this).parent().parent().attr("data-idarea"));
	// 	var namearea=($(this).parent().parent().attr("data-namearea"));
	// 	var idpro=($(this).parent().parent().attr("data-idpro"));
	// 	var iconarea=($(this).parent().parent().attr("data-iconarea"));
	
	//  bootbox.confirm("Bạn có chắc xóa lĩnh vực:[ "+namearea+" ] này không?", function(result){
    //     if(result==true) {
            
    //      var dataSend = {
	// 		 event: "deleteArea",
    //             idarea:idarea
    //         };
       
		
    //         queryData("php/api.php", dataSend, function (data) {
    //           if(data.success==1){
	// 				builddsAreas(pagecurrent_area,record);
	// 				resetViewAREA();
	// 		  }else if(data.success==2){
	// 			  alert_info("Lĩnh vực đã được sử dụng");
	// 		  }else{
	// 			  alert_error("Xóa lỗi");
	// 		  }
               
				
    //         });
			
			
    //     }else
    //     {
    //         // alert_info("Lỗi");
    //     }
    // });
	// });
	
	
	// $(".btnxoaarea").on('click',function () {
	// 	var idarea=$(".txtidarea").val();
	// 	var name=$(".txtnamearea").val();
		
	//  bootbox.confirm("Bạn có chắc xóa lĩnh vực:[ "+name+" ] này không?", function(result){
    //     if(result==true) {
            
    //      var dataSend = {
	// 		 event: "deleteArea",
    //             idarea:idarea
    //         };
       
		
    //         queryData("php/api.php", dataSend, function (data) {
    //           if(data.success==1){
	// 				builddsAreas(pagecurrent_area,record);
	// 				resetViewAREA();
	// 				 alert_info("Đã xóa thành công");
	// 		  }else if(data.success==2){
	// 			  alert_info("Thành viên đã được sử dụng");
	// 		  }else{
	// 			  alert_error("Xóa lỗi");
	// 		  }
               
				
    //         });
			
			
    //     }else
    //     {
    //         // alert_info("Lỗi");
    //     }
    // });
	// })
	$(".btnluuarea").click(function(){
			if(flagAREA==1){
				//console.log("Thêm");
				var id=$(".txtidarea").val();
				var name=$(".txtnamearea").val();
				//var idpro=$(".cbpro").val();
				
				 if(id==""){
					alert_info("Mã không thể trống");
					$(".txtidarea").focus();
				}else if(name==""){
					alert_info("Tên không thể trống");
					$(".txtnamearea").focus();
				}
					else{
					
						var datasend={
								event:"insertAREA",
								idarea:id,
								namearea:name,//,
								//idpro:idpro,
								
								iconarea:urlimageiconarea,
						}
					//	console.log(datasend);
						queryData("php/api.php",datasend,function(res){
							//res là dối tượng server trả về
						//	console.log(""+res);
							if(res.success==1){
								alert_success("Thành công");
								builddsAreas(pagecurrent_area,record);
	
								resetViewAREA();
								 flagAREA=0;
								$(".btnthemarea").prop("disabled",false); //Nút thêm sẽ sáng
								
								$(".btnluuarea").prop("disabled",true);//mờ
							}else{
								alert_error("Thất bại");
							}
						})
					
				}
			}else if(flagAREA==2){
			
			//console.log("Thêm");
				var id=$(".txtidarea").val();
				var name=$(".txtnamearea").val();
				//var idpro=$(".cbpro").val();
				
				 if(id==""){
					alert_info("Mã không thể trống");
					$(".txtidarea").focus();
				}else if(name==""){
					alert_info("Tên không thể trống");
					$(".txtnamearea").focus();
				}else{
					
						var datasend={
								event:"updateArea",
								idarea:id,
								namearea:name,
								//idpro:idpro,
								
								iconarea:urlimageiconarea,
						}
					//	console.log(datasend);
						queryData("php/api.php",datasend,function(res){
							//res là dối tượng server trả về
						//	console.log(""+res);
							if(res.success==1){
								alert_success("Thành công");
								builddsAreas(pagecurrent_area,record);
	
								resetViewAREA();
								 flagAREA=0;
								$(".btnthemarea").prop("disabled",false); //Nút thêm sẽ sáng
								
								$(".btnluuarea").prop("disabled",true);//mờ
							}else{
								alert_error("Thất bại");
							}
						})
					
				}
				
		}else{
			console.log("Chưa chọn thao tác");
		}
			
	});
});
 //viết nội dung hàm này kiểm tra là việc upload có thành công ?
 function ketquauploadcicon(oj){
	 
    if(oj.status==true){
    var img=oj.namefie;
    urlimageiconarea=img;
	alert_success("Tải File Thành công");
	$(".progresscommonarea").html("Tải Thành công");
	//$("#imgPreviewMH").attr("src","serverfileupload/"+img);		
	 }else{
		 $(".progresscommonarea").html("Tải không Thành công");
		 alert_success("Tải File Không Thành công<br>"+oj.message);
		 urlimageiconarea="";
	 }
 }
 //xóa dữ liệu nằm trên các ô
 function resetViewAREA(){
	$(".txtidarea").val("");
	$(".txtnamearea").val("");
	$(".cbpro").val("NULL");
	$(".progresscommonarea").html("");
	
	urlimageiconarea="";
	$(".imgiconarea").addClass("is-hidden"); 
	//hủy sự liện upload
	document.querySelector("#imgiconarea").removeEventListener('change', initUploadAllCommonIConArea);
 }

//  function showCBPro(){
// 	var datasend={
// 				event:"getAllPro"
	
// 		}
// 		//console.log(datasend);
// 		queryData("php/api.php",datasend,function(res){
		
// 			var data=res.items; //data=[{},{}]
// 			if(data.length==0){
// 				$(".cbpro").html('<option value="NULL">Chọn Dự án</option>');
// 			}else{
// 				var htmls='<option value="NULL">Chọn Dự án</option>';
// 			for(var item in data){
// 				var obj=data[item];
// 				htmls=htmls+'<option value="'+obj.idpro+'">('+obj.idpro+')'+obj.namepro+'-'+obj.nambd+'</option>';
// 			}
// 				$(".cbpro").html(htmls);
// 			}
			
// 		});
// }
function builddsAreas(page,record) {
	
  
   var find=$(".txtfindarea").val();
   
    var dataSend={
		event:"getArea",
		page:page,
        record:record,
		
		search:find
		
    }
    
  $(".addListAREA").html('<img src="images/loading.gif" width=100px height=100px />');						
					
	
    queryData("php/api.php",dataSend,function (res) {
   
            $(".addListAREA").html("");
			buildHTMLAREA(res);
      
    });
	
	 
}

function buildHTMLAREA(res) {
	console.log(res)
     if(res.total==0){
	    $(".addListAREA").html("<tr><td colspan='4'>Chưa có cập nhật nội dung</td></tr>");
		$(".numberpagearea").html("");
   }else{ 
    var data = res.items;
		
	var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(record,currentpage);
    var html='';
	
    for (item in data) {
        var list=data[item];
		var img='<img src="'+url+"serverfileupload/"+list.iconarea+'" class="img-circle elevation-2" width="40px" height="40px" alt="avartar">';
	
		if (list.iconarea==""){
			img='<img src="images/no_img.png" class="img-circle elevation-2" width="40px" height="40px" alt="avartar">';
		}
        html=html +
            '<tr  data-idarea="' + list.idarea + '" data-namearea="' + list.namearea + '" data-idpro="' + list.idpro + '" data-iconarea="' + list.iconarea + '" data-vt="' + item + '">' +		
            '<td >' + stt + '</td>' +
			'<td >' + list.idarea +'</td>'+
			'<td >' + list.namearea +'</td>'+
		
			'<td >'+img+'</td>'+
			
			// '<td ><span class="badge bg-danger click_xoa_area"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span>&nbsp;</td>'+
			
            '</tr>';
        stt++;
		
        $(".addListAREA").html(html)
    }
    buildSlidePage($(".numberpagearea"),5,res.page,res.totalpage);
   }
}
