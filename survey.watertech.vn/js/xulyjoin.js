var flagjoin=0;//chưa chọn thao tác

$(document).ready(function() {

	$(".addusername").on('click','.btn_log_out',function(){
		logout();
	});
	var pagecurrent_join=0;
	$(".numberpagejoin").on('click','button',function () {  
		pagecurrent_join=$(this).val();
		builddsJoin($(this).val(),record);
	})
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.btnfindjoin').click(function(){
		
		builddsJoin(0,record);
	});
	
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.txtfindjoin').keypress(function(e){
		if(e.which==13){
		
		builddsJoin(0,record);
		}
	});
	$('.addListjoin').on('click','td',function(e){
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
		flagjoin=0;
		
		$(".btnsuajoin").prop('disabled', false);
		$(".btnthemjoin").prop('disabled', true);
		$(".btnluujoin").prop('disabled', true);
	});

    $(".btnthemjoin").click(function(){
        flagjoin=1;
		$(".btnthemjoin").prop("disabled",true); 
	
		$(".btnluujoin").prop("disabled",false);
	
		$(".txtidarea").focus();
		resetViewJoin();
		
   })
	$(".btnsuajoin").click(function () {
		$(".btnthemjoin").prop('disabled', true);
		$(".btnluujoin").prop('disabled', false);
	    $(".btnsuajoin").prop('disabled', true);
		$(".txtnamearea").focus()
		$(".txtidarea").prop('disabled', true);
		flagjoin=2;//update
 
	});
    $(".btnlamlaijoin").click(function(){
		$(".btnthemjoin").prop("disabled",false); 
		
		$(".btnluujoin").prop("disabled",true);
		$(".txtidarea").prop("disabled",false);//
		resetViewJoin();
		flagjoin=0;
	});
	
	$(".addListjoin").on('click','.click_xoa_join',function () {
			var idarea=($(this).parent().parent().attr("data-idarea"));
		var namearea=($(this).parent().parent().attr("data-namearea"));
		var idpro=($(this).parent().parent().attr("data-idpro"));
		var iconarea=($(this).parent().parent().attr("data-iconarea"));
	
	 bootbox.confirm("Bạn có chắc xóa lĩnh vực:[ "+namearea+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteArea",
                idarea:idarea
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsJoin(pagecurrent_join,record);
					resetViewJoin();
			  }else if(data.success==2){
				  alert_info("Lĩnh vực đã được sử dụng");
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
	
	
	$(".btnxoajoin").on('click',function () {
		var idarea=$(".txtidarea").val();
		var name=$(".txtnamearea").val();
		
	 bootbox.confirm("Bạn có chắc xóa lĩnh vực:[ "+name+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteArea",
                idarea:idarea
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsJoin(pagecurrent_join,record);
					resetViewJoin();
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
	$(".btnluujoin").click(function(){
			
				var idarea=$(".cbareajoin").val();
				var iduser=$(".cbuserjoin").val();
				var startjoin=$(".startjoin").val();
			
				var endjoin=$(".endjoin").val();
				var idpro=$(".cbprojoin").val();
				//dbg = new Date(startjoin);
				//deg=new Date(endjoin);
				
				if(iduser=="NULL"){
					alert_info("Thành viên không thể trống");
					$(".cbuserjoin").focus();
				}else
					if(idarea=="NULL"){
					alert_info("Chọn lĩnh vực");
					$(".cbareajoin").focus();
				}else if(startjoin==""){
					alert_info("Chọn Ngày bắt đầu tham gia dự án");
					$(".startjoin").focus();
				}else if(endjoin==""){
					alert_info("Chọn Ngày kết thúc tham gia dự án");
					$(".endjoin").focus();
				}
				else if (startjoin>endjoin){
					alert_info("Chọn kết thúc phải >= ngày bắt đầu");
				}else{
					
						var datasend={
								event:"insertJoin",
								idarea:idarea,
								iduser:iduser,
								startjoin:startjoin,
								idpro:idpro,
								endjoin:endjoin
						}
					//	console.log(datasend);
						queryData("php/api.php",datasend,function(res){
							//res là dối tượng server trả về
						//	console.log(""+res);
							if(res.success==1){
								alert_success("Thành công");
								//builddsJoin(pagecurrent_join,record);
	
								//resetViewJoin();
								// flagjoin=0;
								//$(".btnthemjoin").prop("disabled",false); //Nút thêm sẽ sáng
								
								//$(".btnluujoin").prop("disabled",true);//mờ
							}else if(res.success==2){
									alert_success("Lĩnh vực của dự án đã tồn tại rồi");
							}else{
								alert_error("Thất bại");
							}
						})
					
				}
			
			
	});
});

 //xóa dữ liệu nằm trên các ô
 function resetViewJoin(){
	$(".txtidarea").val("");
	$(".txtnamearea").val("");
	$(".cbpro").val("NULL");
	$(".progresscommonarea").html("");
	
	urlimageiconarea="";
	$(".imgiconarea").addClass("is-hidden"); 
	}

 function showCBProJoin(){
	var datasend={
				event:"getAllPro"
	
		}
		//console.log(datasend);
		queryData("php/api.php",datasend,function(res){
		
			var data=res.items; //data=[{},{}]
			if(data.length==0){
				$(".cbprojoin").html('<option value="NULL">Chọn Dự án</option>');
			}else{
				var htmls='<option value="NULL">Chọn Dự án</option>';
			for(var item in data){
				var obj=data[item];
				htmls=htmls+'<option value="'+obj.idpro+'">('+obj.idpro+' ) '+obj.namepro+'-'+obj.nambd+'</option>';
			}
				$(".cbprojoin").html(htmls);
			}
			
		});
}
function showCBAreaProJoin(){
	var datasend={
				event:"getAllAreaByPro"
	
		}
		//console.log(datasend);
		queryData("php/api.php",datasend,function(res){
		
			var data=res.items; //data=[{},{}]
			if(data.length==0){
				$(".cbareajoin").html('<option value="NULL">Chọn Lĩnh vực</option>');
			}else{
				var htmls='<option value="NULL">Chọn Lĩnh vực</option>';
			for(var item in data){
				var obj=data[item];
				htmls=htmls+'<option value="'+obj.idarea+'">('+obj.idarea+' ) '+obj.namearea+'</option>';
			}
				$(".cbareajoin").html(htmls);
			}
			
		});
}
function showCBUsersProJoin(){
	var datasend={
				event:"getALLUsers"
	
		}
		//console.log(datasend);
		queryData("php/api.php",datasend,function(res){
		
			var data=res.items; //data=[{},{}]
			if(data.length==0){
				$(".cbuserjoin").html('<option value="NULL">Chọn thành viên</option>');
			}else{
				var htmls='<option value="NULL">Chọn Thành Viên</option>';
			for(var item in data){
				var obj=data[item];
				htmls=htmls+'<option value="'+obj.iduser+'">'+obj.username+"--"+obj.fullname+'</option>';
			}
				$(".cbuserjoin").html(htmls);
			}
			
		});
}
function builddsJoin(page,record) {
	
  
   var find=$(".txtfindjoin").val();
   
    var dataSend={
		event:"getAreaJoin",
		page:page,
        record:record,
		
		search:find
		
    }
    
  $(".addListjoin").html('<img src="images/loading.gif" width=100px height=100px />');						
					
	
    queryData("php/api.php",dataSend,function (res) {
   
            $(".addListjoin").html("");
			buildHTMLJoin(res);
      
    });
	
	 
}

function buildHTMLJoin(res) {
	console.log(res)
     if(res.total==0){
	    $(".addListjoin").html("<tr><td colspan='4'>Chưa có cập nhật nội dung</td></tr>");
		$(".numberpagejoin").html("");
   }else{ 
    var data = res.items;
		
	var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(record,currentpage);
    var html='';
	
    for (item in data) {
        var list=data[item];
        html=html +
            '<tr  data-idassign="' + list.idassign + '" data-iduser="' + list.iduser + '" data-vt="' + item + '">' +		
            '<td >' + stt + '</td>' +
			
			'<td >' + list.namepro +'</td>'+
			'<td >' + list.namearea +'</td>'+
			'<td >Xem ('+list.SLUSER+')</td>'+
			'<td >' + list.datebeginjoin +'</td>'+
			'<td >' + list.dateendjoin +'</td>'+
			
			'<td ><span class="badge bg-danger click_xoa_join"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span>&nbsp;</td>'+
			
            '</tr>';
        stt++;
		
        $(".addListjoin").html(html)
    }
    buildSlidePage($(".numberpagejoin"),5,res.page,res.totalpage);
   }
}
