//Khi load form len thi cac nut lưu  và sữa sẽ mờ
var flagDA=0;//Chưa có thao tác nào

var mangda=[];
$(document).ready(function(){
	builddsDA(0,record);
	$(".btnthemda").click(function () {
		$(".btnthemda").prop('disabled', true);
		$(".btnluuda").prop('disabled', false);
	    $(".btnsuada").prop('disabled', true);
		resetViewFormDA();
		$('.txtmada').focus();
		flagDA=1;//Thêm
			
	});
	$(".btnsuada").click(function () {
		$(".btnthemda").prop('disabled', true);
		$(".btnluuda").prop('disabled', false);
	    $(".btnsuada").prop('disabled', true);
		
		$(".txtmada").prop('disabled', true);
		flagDA=2;//update
		
	});
	$(".btnlamlaida").click(function () {
		resetViewFormDA();
		$(".btnthemda").prop('disabled', false);
		$(".btnluuda").prop('disabled', true);
	    $(".btnsuada").prop('disabled', true);
		flagDA=0;
		$(".txtmada").prop('disabled', false);
	});
	$(".btnluuda").click(function () {
		if(flagDA==1)
		{
			
			var mada=$(".txtmada").val();
			var tenda=$(".txttenda").val();
			var datebgin=$(".startpro").val();
			var dateend=$(".endpro").val();
			var datasend = {
                        event: "insertDA",
                        mada:mada,
						tenda:tenda,
						nambd:datebgin,
						namkt:dateend
                    };
			if(mada=="" || mada.length!=6)
			{
				alert("Mã dự án Không thể trống hoặc phải 6 ký tự");
				$(".txtmada").focus();
			}else if(tenda==""){
				alert("Tên dự án Không thể trống");
				$(".txttenda").focus();
			}else if(datebgin==""){
						alert_info("Chọn ngày bắt đầu");
						$(".begingio").focus()
					
			}else if(dateend==""){
						alert_info("Chọn ngày kết thúc");
						$(".begingio").focus()
					
			}else if(datebgin>=dateend){
					alert_info("Ngày tháng năm kết thúc phải lớn hơn Ngày tháng năm bắt đầu");
			}else{
				
				queryData("php/api.php",datasend, function (data) {
										
						if(data.success==0){
							alert_info("Thêm dữ liệu Thất bại !!");
						}	
                        else if(data.success==1){
							$(".btnthemda").prop('disabled', false);
							$(".btnluuda").prop('disabled', true);
							$(".btnsuada").prop('disabled', true);
							resetViewFormDA();
							flagDA=0;
							alert_info("Thêm dữ liệu Thành công !!");
							builddsDA(pagecurrent_da,record);
                        }else if(data.success==2){
							alert_info("Đã trùng mã dự án!!");
							
						}
						else{
                            alert_info("Thất bại. Xin vui lòng thực hiện sau!!");
                        }
                    });
			}
				
		}else if(flagDA==2){
			
			var mada=$(".txtmada").val();
			var tenda=$(".txttenda").val();
			var datebgin=$(".startpro").val();
			var dateend=$(".endpro").val();
			var datasend = {
                        event: "updateDA",
                        mada:mada,
						tenda:tenda,
						nambd:datebgin,
						namkt:dateend
                    };
			if(mada=="" || mada.length!=6)
			{
				alert("Mã dự án Không thể trống hoặc phải 6 ký tự");
				$(".txtmada").focus();
			}else if(tenda==""){
				alert("Tên dự án Không thể trống");
				$(".txttenda").focus();
			}else if(datebgin==""){
						alert_info("Chọn ngày bắt đầu");
						$(".begingio").focus()
					
			}else if(dateend==""){
						alert_info("Chọn ngày kết thúc");
						$(".begingio").focus()
					
			}else if(datebgin>=dateend){
					alert_info("Ngày tháng năm kết thúc phải lớn hơn Ngày tháng năm bắt đầu");
			}else{
				queryData("php/api.php",datasend, function (data) {
										console.log(data);
						if(data.success==0){
							alert_info("Cập nhật dữ liệu Thất bại !!");
						}	
                        else if(data.success==1){
							alert_info("Cập nhật dữ liệu Thành công !!");
							$(".btnthemda").prop('disabled', false);
							$(".btnluuda").prop('disabled', true);
							$(".btnsuada").prop('disabled', true);
							flagDA=0;
							builddsDA(pagecurrent_da,record);
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
	var pagecurrent_da=0;
	$(".numberpageda").on('click','button',function () {  
		pagecurrent_da=$(this).val();
		builddsDA($(this).val(),record);
	})
	$(".addListDA").on('click','.click_xoa_duan',function () {
		var vt=($(this).parent().attr("data-vt"));
		var mada=mangda[vt].idpro;
		var tenda=mangda[vt].namepro;
	 bootbox.confirm("Bạn có chắc xóa dự án:[ "+tenda+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteDA",
                mada:mada
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsDA(pagecurrent_da,record);
					resetViewFormDA();
			  }else if(data.success==2){
				  alert_info("Dự án đã được sử dụng");
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
	$(".btnxoada").on('click',function () {
		var mada=$(".txtmada").val();
		var tenda=$(".txttenda").val();
	 bootbox.confirm("Bạn có chắc xóa dự án:[ "+tenda+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteDA",
                mada:mada
            };
       
		
            queryData("php/api.php", dataSend, function (data) {
              if(data.success==1){
					builddsDA(pagecurrent_da,record);
					resetViewFormDA();
					 alert_info("Đã xóa thành công");
			  }else if(data.success==2){
				  alert_info("Bộ phận đã được sử dụng");
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
	
	$('.btnfindda').click(function(){
		
		builddsDA(0,record);
	});
	
	//Xử lý tìm thể loại khi nhấn nút tìm
	
	$('.txtfindda').keypress(function(e){
		if(e.which==13){
		
		builddsDA(0,record);
		}
	});
	$('.addListDA').on('click','td',function(e){
		$(this).parent().css("background-color","lightgray");
		$(this).parent().siblings().css("background-color","white");
		var mada=($(this).parent().attr("data-mada"));
		var tenda=($(this).parent().attr("data-tenda"));
		var begin=($(this).parent().attr("data-begin"));
		var end=($(this).parent().attr("data-end"));
		$('.txtmada').val(mada);
		$('.txttenda').val(tenda);
		$('.startpro').val(begin);
		$('.endpro').val(end);
		flagDA=0;
		
		$(".btnsuada").prop('disabled', false);
		$(".btnthemda").prop('disabled', true);
		$(".btnluuda").prop('disabled', true);
	});
});

function builddsDA(page,record) {
	
  
   var find=$(".txtfindda").val();
   
    var dataSend={
		event:"getDA",
		page:page,
        record:record,
		
		search:find
		
    }
    
   $(".addListDA").html('<img src="images/loading.gif" width=100px height=100px />');						
					
	
    queryData("php/api.php",dataSend,function (res) {
   
            $(".addListDA").html("");
			buildHTMLDuAn(res);
      
    });
	
	 
}

function buildHTMLDuAn(res) {
     if(res.total==0){
	    $(".addListDA").html("<tr><td colspan='4'>Chưa có cập nhật nội dung</td></tr>");
		$(".numberpageda").html("");
   }else{ 
    var data = res.items;
	mangda=data;	
	var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(record,currentpage);
    var html='';
	
    for (item in data) {
        var list=data[item];
		
        html=html +
            '<tr  data-mada="' + list.idpro + '" data-tenda="' + list.namepro + '" data-begin="' + list.beginpro + '" data-end="' + list.endpro + '"  data-vt="' + item + '">' +		
            '<td >' + stt + '</td>' +
			'<td >' + list.idpro +'</td>'+
			'<td >' + list.namepro +'</td>'+
			'<td >' + list.beginpro +'</td>'+
			'<td >' + list.endpro +'</td>'+
			'<td class="click_xoa_duan"><span class="badge bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>'+
			
            '</tr>';
        stt++;
		
        $(".addListDA").html(html)
    }
    buildSlidePage($(".numberpageda"),5,res.page,res.totalpage);
   }
}
function resetViewFormDA(){
		$('.txtmada').val("");
		$('.txttenda').val("");
	}