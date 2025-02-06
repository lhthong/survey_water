//Đây là file chứa hàm dùng chung trong trang web
//sẽ hiển thị form mà mình chọn
var record=9;
var myUser;
//trang thai de biet la co sua hay kg

function buildUserDropdown(){
		
    myUser=JSON.parse(localStorage.getItem("usersurveytlus"));
	
	var avartar=localStorage.getItem("avatarsurveytlus");
	
	if(myUser==undefined || myUser==null||myUser==""){
		
	    location.href ="login.html";
	}
	else{
			
		$(".addusername").html("<div style='text-align=center;'><span style='color: white;'>"+myUser.items[0].fullname+'</span><br><a href="#" style="color: white;" class="btn_change_matkhau">[Đổi mật khẩu]</a>&nbsp;<a href="#" class="btn_log_out" style="color: white;">[Logout]</a></div>');
		
		if(avartar=="" || avartar==undefined||avartar=="null"){
			$(".addvartar").attr("src","images/avatar.png");
		}
		else{
			$(".addvartar").attr("src","serverfileupload/"+avartar);
		}	
		
		
	}
}
function buildUserMap(){
		
    myUser=JSON.parse(localStorage.getItem("usersurveytlus"));
	
	var avartar=localStorage.getItem("avatarsurveytlus");
	
	if(myUser==undefined || myUser==null||myUser==""){
		
	    location.href ="login.html";
	}
	else{
		//console.log(myUser.items[0].fullname)
		$(".addusername").html(myUser.items[0].fullname);
		if(myUser.items[0].permission==0){
			$(".roleusername").html("<a href='admin.html'>Quản trị</a>")
		}else if(myUser.items[0].permission==1){
			$(".roleusername").html("<a href='admin.html'>Biên tập dữ liệu</a>")
		}else if(myUser.items[0].permission==2){
			$(".roleusername").html("<a href='admin.html'>Thu thập dữ liệu</a>")
		}
		if(avartar=="" || avartar==undefined||avartar=="null"){
			$(".addvartar").attr("src","images/avatar.png");
		}
		else{
			$(".addvartar").attr("src","serverfileupload/"+avartar);
		}	
		
		
	}
}
function logout() {
		
		   localStorage.removeItem("avatarsurveytlus");
           localStorage.removeItem("usersurveytlus");
          
           location.href ="login.html";
       
}
function swapMain(tenhienthi){
    $(".frmusers").addClass("is-hidden");
   
	$(".frmtk_area").addClass("is-hidden");
    
	$(".frmarea").addClass("is-hidden");
    $("."+tenhienthi).removeClass("is-hidden"); //hiển thị form lên
}
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
//Sử dụng thư viện bootbox.min.js
function alert_error(mes) {
    bootbox.alert({
        size: "small",
        title: "",
        message: mes,
        callback: function(){ /* your callback code */ }
    });
}
function alert_success(mes,callback) {
    bootbox.alert({
        size: "small",
        title: "",
        message: mes,
        callback: callback
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
function printSTT(record,pageCurr){
    if ((pageCurr+1)==1) {
        return 1;
    }else{
        return record*(pageCurr+1)-(record-1);
    }
}
function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <=codan; i++) {
        if(pageActive-i<0) break;
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
    }
    if(pageActive>codan){
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">...</button>'+html;
    }
    html+='<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="'+pageActive+'">'+(pageActive+1)+'</button>';
    for(i = 1 ; i <=codan; i++){
        if(pageActive+i>=totalPage) break;
        html=html+'<button  type="button" class="btn btn-outline btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
    }
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}

function initUploadAllCommonIConArea(){
	
	var files = event.target.files;
		var countFile=files.length;
		for (var i in files) {
			if (typeof files[i] !== 'object') return false;
			(function () {		
                console.log(files[i]);	
					 $(".progresscommonarea").html("Đang tải file. Xin vui lòng chờ<br>");
					upload(files[i],function(res){	
                        //console.log(res);						
							ketquauploadcicon(JSON.parse(res));					
					});
			}());

		}

	
}
var upload = function (photo, callback) {
	
	var formData = new FormData();
    formData.append('sendimage', photo);
    
    $.ajax({
        url: 'php/upload_api.php',
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success : callback
    });
};
function initUploadALLImage(){
	
	var files = event.target.files;
		var countFile=files.length;
		for (var i in files) {
			if (typeof files[i] !== 'object') return false;
			(function () {		
                console.log(files[i]);	
					 $(".progresscommon").html("Đang tải file. Xin vui lòng chờ<br>");
					upload(files[i],function(res){	
                        //console.log(res);						
							ketquauploadimagedata(JSON.parse(res));					
					});
			}());

		}

	
}
//Xoa dataarea by id
function deleteDataAreaID(id,view){
	
		bootbox.confirm('Bạn có chắc xóa không?!',
			function (result) {
				// console.log('This was logged in the callback: ' + result);
				if (result == true) {
					var datasend = {
						event: "deleteDataCollected",
						id: id
					}
					queryData("php/api.php", datasend, function (res) {
						if (res.success == 1) {
							alert_info("Xóa thành công")
							// for (; Object.keys(map._layers).length > 1;) {
							// 	map.removeLayer(map._layers[Object.keys(map._layers)[1]]);

							// }

							// $('.leaflet-control-layers-selector')[1].click()
							$("."+view).modal("hide");
						} else {
							alert_info("Xóa thất bại")
						}
					});
				}
			});
}
//Hiển thị hình ảnh trên Tab hình ảnh khi xem các lĩnh vực
function showimagetab(arrimageview,url){
    var imghtml='';
				var btntml='';
				if(arrimageview.length==0){
					imghtml='';
					btntml=''
				}else{
				
				for(var i=0;i<arrimageview.length-1;i++){
					btntml=btntml+ 
					'<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="'+i+'" class="" aria-label="Slide '+(i+1)+'"></button>';
				 
					var im = url + "serverfileupload/" + arrimageview[i];
					imghtml=imghtml+'<div class="carousel-item">'+
					'<img src="'+im+'" width="100px" height="400px" class="d-block w-100" alt="...">'+
				  '</div>';
				}
				btntml=btntml+ '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="'+(arrimageview.length-1)+'" class="" aria-current="" aria-label="Slide '+(arrimageview.length)+'"></button>';
			 
				 im = url + "serverfileupload/" + arrimageview[arrimageview.length-1];
				imghtml=imghtml+'<div class="carousel-item active">'+
					'<img src="'+im+'" width="100px" height="400px" class="d-block w-100" alt="...">'+
				  '</div>';
				}
				var htmlimage='';
				
				htmlimage=htmlimage+'<div class="carousel-indicators">'+btntml+'</div>'+
                          '<div class="carousel-inner">'+  imghtml +' </div>'+       
                          '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">'+
                            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                            '<span class="visually-hidden">Previous</span>'+
                          '</button>'+
                          '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">'+
                            '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                            '<span class="visually-hidden">Next</span>'+
                         ' </button>';
    return htmlimage;
                
}
//content cua tung linh vuc
function showcontent_cong_tren_kenh(l,lgeo){
	var html=
	'<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
	'<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
	'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
	'<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
	'<tr><td><b>Tên cống:</b></td><td>'+l.namecong+"</td></tr>"+
	'<tr><td><b>Khẩu độ:</b></td><td>'+l.khaudocong+"</td></tr>"+
	'<tr><td><b>Loại cống:</b></td><td>'+l.loaicong+"</td></tr>"+
	'<tr><td><b>Năm xây dựng:</b></td><td>'+l.namxdcong+"</td></tr>"+
	'<tr><td><b>Diện tích đất công nghiệp:</b></td><td>'+l.dtdatcongnghiepcong+" m<sup>2</sup></td></tr>"+
	'<tr><td><b>Cao trình đáy:</b></td><td>'+l.caotrinhdaycong+" </td></tr>"+
	'<tr><td><b>Kênh dẫn:</b></td><td>'+l.kenhdancong+" </td></tr>"+	
	'<tr><td><b>Tọa độ:</b></td><td>'+lgeo+"</td></tr>";
     return html;			    
}
function showcontent_cong_tren_kenh_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Tên cống:</b></td><td><input class="form-control namecong" type="text" value="'+l.namecong+'"/></td></tr>'+
			'<tr><td><b>Khẩu độ:</b></td><td><input class="form-control khaudocong" type="text" value="'+l.khaudocong+'"/></td></tr>'+
			'<tr><td><b>Loại cống:</b></td><td><input class="form-control loaicong" type="text" value="'+l.loaicong+'"/></td></tr>'+
		
			'<tr><td><b>Năm xây dựng:</b></td><td><input class="form-control namxdcong" type="text" value="'+l.namxdcong+'"/></td></tr>'+
			'<tr><td><b>Diện tích đất công nghiệp:</b></td><td><input class="form-control dtdatcongnghiepcong" type="text" value="'+l.dtdatcongnghiepcong+'"/></td></tr>'+
			'<tr><td><b>Cao trình đáy:</b></td><td><input class="form-control caotrinhdaycong" type="text" value="'+l.caotrinhdaycong+'"/></td></tr>'+
			'<tr><td><b>Kênh dẫn:</b></td><td><input class="form-control kenhdancong" type="text" value="'+l.kenhdancong+'"/></td></tr>'+
			
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}


function showcontent_mau_dat(l,lgeo){
	var html=
	'<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
	'<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
	'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
	'<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
	'<tr><td><b>Dự án:</b></td><td>'+l.mau_dat_du_an+"</td></tr>"+
	'<tr><td><b>Ký hiệu mẫu:</b></td><td>'+l.mau_dat_ky_hieu_mau+"</td></tr>"+
	'<tr><td><b>Ngày lấy mẫu:</b></td><td>'+l.mau_dat_ngay_lay_mau+"</td></tr>"+
	'<tr><td><b>Người lấy mẫu:</b></td><td>'+l.mau_dat_nguoi_lay_mau+"</td></tr>"+
	'<tr><td><b>Số chỉ tiêu:</b></td><td>'+l.mau_dat_so_chi_tieu+"</td></tr>"+
	
	'<tr><td><b>Tọa độ::</b></td><td>'+lgeo+"</td></tr>";
	

   
        return html;
			    
}
function showcontent_mau_dat_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Dự án:</b></td><td><input class="form-control mau_dat_du_an" type="text" value="'+l.mau_dat_du_an+'"/></td></tr>'+
			'<tr><td><b>Ký hiệu mẫu:</b></td><td><input class="form-control mau_dat_ky_hieu_mau" type="text" value="'+l.mau_dat_ky_hieu_mau+'"/></td></tr>'+
			'<tr><td><b>Ngày lấy mẫu:</b></td><td><input class="form-control mau_dat_ngay_lay_mau" type="date" value="'+l.mau_dat_ngay_lay_mau+'"/></td></tr>'+
			'<tr><td><b>Người lấy mẫu:</b></td><td><input class="form-control mau_dat_nguoi_lay_mau" type="text" value="'+l.mau_dat_nguoi_lay_mau+'"/></td></tr>'+
			'<tr><td><b>Số chỉ tiêu:</b></td><td><input class="form-control mau_dat_so_chi_tieu" type="text" value="'+l.mau_dat_so_chi_tieu+'"/></td></tr>'+
			
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}


function showcontent_mau_nuoc(l,lgeo){
console.log(l)
	var html=
	'<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
	'<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
	'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
	'<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
	'<tr><td><b>Dự án:</b></td><td>'+l.mau_nuoc_du_an+"</td></tr>"+
	'<tr><td><b>Ký hiệu mẫu:</b></td><td>'+l.mau_nuoc_ky_hieu_mau+"</td></tr>"+
	'<tr><td><b>Ngày lấy mẫu:</b></td><td>'+l.mau_nuoc_ngay_lay_mau+"</td></tr>"+
	'<tr><td><b>Người lấy mẫu:</b></td><td>'+l.mau_nuoc_nguoi_lay_mau+"</td></tr>"+
	'<tr><td><b>Số chỉ tiêu:</b></td><td>'+l.mau_nuoc_so_chi_tieu+"</td></tr>"+
	
	'<tr><td><b>Tọa độ:</b></td><td>'+lgeo+"</td></tr>";
	
   
        return html;
			    
}
function showcontent_mau_nuoc_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Dự án:</b></td><td><input class="form-control mau_nuoc_du_an" type="text" value="'+l.mau_nuoc_du_an+'"/></td></tr>'+
			'<tr><td><b>Ký hiệu mẫu:</b></td><td><input class="form-control mau_nuoc_ky_hieu_mau" type="text" value="'+l.mau_nuoc_ky_hieu_mau+'"/></td></tr>'+
			'<tr><td><b>Ngày lấy mẫu:</b></td><td><input class="form-control mau_nuoc_ngay_lay_mau" type="date" value="'+l.mau_nuoc_ngay_lay_mau+'"/></td></tr>'+
			'<tr><td><b>Người lấy mẫu:</b></td><td><input class="form-control mau_nuoc_nguoi_lay_mau" type="text" value="'+l.mau_nuoc_nguoi_lay_mau+'"/></td></tr>'+
			'<tr><td><b>Số chỉ tiêu:</b></td><td><input class="form-control mau_nuoc_so_chi_tieu" type="text" value="'+l.mau_nuoc_so_chi_tieu+'"/></td></tr>'+
			
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}

function showcontent_vi_tri_sat_lo(l,lgeo){
	var html=
	'<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
	'<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
	'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
	'<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
	'<tr><td><b>Công Trình sạt lở:</b></td><td>'+l.vi_tri_sat_lo_cong_trinh+"</td></tr>"+
	'<tr><td><b>Chiều dài:</b></td><td>'+l.vi_tri_sat_lo_chieu_dai+" m</td></tr>"+
	'<tr><td><b>Chiều rộng:</b></td><td>'+l.vi_tri_sat_lo_chieu_rong+" m</td></tr>"+
	'<tr><td><b>Mức độ nguy hiểm:</b></td><td>'+l.vi_tri_sat_lo_muc_do_nguy_hiem+"</td></tr>"+
	
	'<tr><td><b>Tọa độ::</b></td><td>'+lgeo+"</td></tr>";
	

    
        return html;
			    
}
function showcontent_vi_tri_sat_lo_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Công Trình sạt lở:</b></td><td><input class="form-control vi_tri_sat_lo_cong_trinh" type="text" value="'+l.vi_tri_sat_lo_cong_trinh+'"/></td></tr>'+
			'<tr><td><b>Chiều dài:</b></td><td><input class="form-control vi_tri_sat_lo_chieu_dai" type="text" value="'+l.vi_tri_sat_lo_chieu_dai+'"/></td></tr>'+
			'<tr><td><b>Chiều rộng:</b></td><td><input class="form-control vi_tri_sat_lo_chieu_rong" type="text" value="'+l.vi_tri_sat_lo_chieu_rong+'"/></td></tr>'+
			'<tr><td><b>Mức độ nguy hiểm:</b></td><td><input class="form-control vi_tri_sat_lo_muc_do_nguy_hiem" type="text" value="'+l.vi_tri_sat_lo_muc_do_nguy_hiem+'"/></td></tr>'+
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}


function showcontent_khu_tuoi(l,lgeo){
   
	var html=
	'<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
	'<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
	'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
	'<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
	'<tr><td><b>Khu tưới:</b></td><td>'+l.khu_tuoi_ten+"</td></tr>"+
	'<tr><td><b>Nguồn nước:</b></td><td>'+l.khu_tuoi_nguon_nuoc+"</td></tr>"+
	'<tr><td><b>Diện tích đất công nghiệp:</b></td><td>'+l.khu_tuoi_dien_tich_dat_cong_nghiep+" m<sup>2</sup></td></tr>"+
	'<tr><td><b>Diện tích đất nông nghiệp:</b></td><td>'+l.khu_tuoi_dien_tich_dat_nong_nghiep+" m<sup>2</sup></td></tr>"+
	'<tr><td><b>Tổng chiều dài kênh cấp 1:</b></td><td>'+l.khu_tuoi_tong_chieu_dai_kenh_cap_1+" m</td></tr>"+
	'<tr><td><b>Tổng chiều dài kênh cấp 2:</b></td><td>'+l.khu_tuoi_tong_chieu_dai_kenh_cap_2+" m</td></tr>"+
	
	'<tr><td><b>Tọa độ::</b></td><td>'+lgeo+"</td></tr>";
	
        return html;
			    
}
function showcontent_khu_tuoi_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Khu tưới:</b></td><td><input class="form-control khu_tuoi_ten" type="text" value="'+l.khu_tuoi_ten+'"/></td></tr>'+
			'<tr><td><b>Nguồn nước:</b></td><td><input class="form-control khu_tuoi_nguon_nuoc" type="text" value="'+l.khu_tuoi_nguon_nuoc+'"/></td></tr>'+
			'<tr><td><b>Diện tích đất công nghiệp:</b></td><td><input class="form-control khu_tuoi_dien_tich_dat_cong_nghiep" type="text" value="'+l.khu_tuoi_dien_tich_dat_cong_nghiep+'"/></td></tr>'+
			'<tr><td><b>Diện tích đất nông nghiệp:</b></td><td><input class="form-control khu_tuoi_dien_tich_dat_nong_nghiep" type="text" value="'+l.khu_tuoi_dien_tich_dat_nong_nghiep+'"/></td></tr>'+
			'<tr><td><b>Tổng chiều dài kênh cấp 1:</b></td><td> <input class="form-control khu_tuoi_tong_chieu_dai_kenh_cap_1" type="text" value="'+l.khu_tuoi_tong_chieu_dai_kenh_cap_1+'"/></td></tr>'+
			'<tr><td><b>Tổng chiều dài kênh cấp 2:</b></td><td> <input class="form-control khu_tuoi_tong_chieu_dai_kenh_cap_2" type="text" value="'+l.khu_tuoi_tong_chieu_dai_kenh_cap_2+'"/></td></tr>'+
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}

function showcontent_kenh_dan(l,lgeo){
    var html=
						 '<tr><td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+"</td></tr>"+
						 '<tr><td><b>Quận/Huyện:</b></td><td>'+l.namedistrict+"</td></tr>"+
						 '<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+"</td></tr>"+
						 '<tr><td><b>Địa chỉ:</b></td><td>'+l.addresschung+"</td></tr>"+
						 '<tr><td><b>Tên kênh:</b></td><td>'+l.kenh_dan_ten+"</td></tr>"+
						 '<tr><td><b>Loại kênh:</b></td><td>'+l.kenh_dan_loai_kenh+"</td></tr>"+
						 '<tr><td><b>Hồ chứa:</b></td><td>'+l.kenh_dan_ho_chua+"</td></tr>"+
						 '<tr><td><b>Cấp kênh:</b></td><td>'+l.kenh_dan_cap_kenh+"</td></tr>"+
						 '<tr><td><b>Năm xây dựng:</b></td><td>'+l.kenh_dan_nam_xay_dung+"</td></tr>"+
						 '<tr><td><b>Phạm vi tưới:</b></td><td>'+l.kenh_dan_pham_vi_tuoi+"</td></tr>"+
						 '<tr><td><b>Tọa độ:</b></td><td>'+lgeo.toString()+"</td></tr>";
						
						
						
        return html;
			    
}
function showcontent_kenh_dan_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td><b>Tên kênh:</b></td><td><input class="form-control kenh_dan_ten" type="text" value="'+l.kenh_dan_ten+'"/></td></tr>'+
			'<tr><td><b>Loại kênh:</b></td><td><input class="form-control kenh_dan_loai_kenh" type="text" value="'+l.kenh_dan_loai_kenh+'"/></td></tr>'+
			'<tr><td><b>Hồ chứa:</b></td><td><input class="form-control kenh_dan_ho_chua" type="text" value="'+l.kenh_dan_ho_chua+'"/></td></tr>'+
			'<tr><td><b>Cấp kênh:</b></td><td><input class="form-control kenh_dan_cap_kenh" type="text" value="'+l.kenh_dan_cap_kenh+'"/></td></tr>'+
			'<tr><td><b>Năm xây dựng:</b></td><td> <input class="form-control kenh_dan_nam_xay_dung" type="text" value="'+l.kenh_dan_nam_xay_dung+'"/></td></tr>'+
			'<tr><td><b>Phạm vi tưới:</b></td><td> <input class="form-control kenh_dan_pham_vi_tuoi" type="text" value="'+l.kenh_dan_pham_vi_tuoi+'"/></td></tr>'+
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}
function showcontent_ho_chua_edit(type,l,lgeo,lgeonew){

	$(".btneupdateview").attr("data-namearea",l.namearea);
	$(".btneupdateview").attr("data-geo",lgeonew);
	var st_toa_do="";
	
	if(type=="Point"){
	st_toa_do=lgeonew.lng+","+lgeonew.lat;
	}else{
	
	for(var i in lgeonew){
	 	st_toa_do=st_toa_do+lgeonew[i].lng+","+lgeonew[i].lat+","
		
	 }
	}
    var html=
			'<tr><td colspan="2" class="bg-success" style="color:white;">Thông tin công trình:</td></tr>'+

			'<tr><td><b>Tên hồ chứa:</b></td><td><input class="form-control ho_chua_ten_ho" type="text" value="'+l.ho_chua_ten_ho+'"/></td></tr>'+
			'<tr><td><b>Cấp công trình:</b></td><td><input class="form-control ho_chua_cap_cong_trinh" type="text" value="'+l.ho_chua_cap_cong_trinh+'"/></td></tr>'+
			'<tr><td><b>Đơn vị thiết kế:</b></td><td><input class="form-control ho_chua_don_vi_thiet_ke" type="text" value="'+l.ho_chua_don_vi_thiet_ke+'"/></td></tr>'+
			'<tr><td><b>Đơn vị thi công:</b></td><td><input class="form-control ho_chua_don_vi_thi_cong" type="text" value="'+l.ho_chua_don_vi_thi_cong+'"/></td></tr>'+
			'<tr><td><b>Đơn vị quản lý:</b></td><td> <input class="form-control ho_chua_don_vi_quan_ly" type="text" value="'+l.ho_chua_don_vi_quan_ly+'"/></td></tr>'+
			'<tr><td><b>Năm xây dựng:</b></td><td> <input class="form-control ho_chua_nam_xay_dung" type="text" value="'+l.ho_chua_nam_xay_dung+'"/></td></tr>'+
			'<tr><td><b>Năm hoàn thành:</b></td><td> <input class="form-control ho_chua_nam_hoan_thanh" type="text" value="'+l.ho_chua_nam_hoan_thanh+'"/></td></tr>'+
			'<tr><td><b>Diện tích tưới:</b></td><td> <input class="form-control ho_chua_dien_tich_tuoi" type="text" value="'+l.ho_chua_dien_tich_tuoi+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Thông số thiết kế:</td></tr>'+
			'<tr><td><b>Diện tích lưu vực:</b></td><td> <input class="form-control ho_chua_dien_tich_luu_vuc" type="text" value="'+l.ho_chua_dien_tich_luu_vuc+'"/></td></tr>'+
			'<tr><td><b>Diện tích hữu dụng:</b></td><td> <input class="form-control ho_chua_dien_tich_huu_dung" type="text" value="'+l.ho_chua_dien_tich_huu_dung+'"/></td></tr>'+
			'<tr><td><b>Mực nước dâng bình thường:</b></td><td> <input class="form-control ho_chua_dien_tich_muc_nuoc_dang_binh_thuong" type="text" value="'+l.ho_chua_dien_tich_muc_nuoc_dang_binh_thuong+'"/></td></tr>'+
			'<tr><td><b>Mực nước phòng lũ thiết kế:</b></td><td> <input class="form-control ho_chua_muc_nuoc_phong_lu_thiet_ke" type="text" value="'+l.ho_chua_muc_nuoc_phong_lu_thiet_ke+'"/></td></tr>'+
			'<tr><td><b>Mực nước chết:</b></td><td> <input class="form-control ho_chua_muc_nuoc_chet" type="text" value="'+l.ho_chua_muc_nuoc_chet+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Thông số thiết kế đập:</td></tr>'+
				
			'<tr><td><b>Loại đập:</b></td><td> <input class="form-control ho_chua_loai_dap" type="text" value="'+l.ho_chua_loai_dap+'"/></td></tr>'+
			'<tr><td><b>Bề rộng đập:</b></td><td> <input class="form-control ho_chua_be_rong_dap" type="text" value="'+l.ho_chua_be_rong_dap+'"/></td></tr>'+
			'<tr><td><b>Chiều cao đập:</b></td><td> <input class="form-control ho_chua_chieu_cao_dap" type="text" value="'+l.ho_chua_chieu_cao_dap+'"/></td></tr>'+
			'<tr><td><b>Độ dốc mái thượng lưu:</b></td><td> <input class="form-control ho_chua_doc_mai_thuong_luu" type="text" value="'+l.ho_chua_doc_mai_thuong_luu+'"/></td></tr>'+
			'<tr><td><b>Độ dốc mái hạ lưu:</b></td><td> <input class="form-control ho_chua_doc_mai_ha_luu" type="text" value="'+l.ho_chua_doc_mai_ha_luu+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Thông số thiết kế tràn:</td></tr>'+
			'<tr><td><b>Bề rộng tràn:</b></td><td> <input class="form-control ho_chua_be_rong_tran" type="text" value="'+l.ho_chua_be_rong_tran+'"/></td></tr>'+
			'<tr><td><b>Cao trình ngưỡng tràn:</b></td><td> <input class="form-control ho_chua_cao_trinh_nguong_tran" type="text" value="'+l.ho_chua_cao_trinh_nguong_tran+'"/></td></tr>'+
			'<tr><td><b>Q tràn:</b></td><td> <input class="form-control ho_chua_q_tran" type="text" value="'+l.ho_chua_q_tran+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Thông số Cống lấy nước từ đập:</td></tr>'+
			'<tr><td><b>Loại cống:</b></td><td> <input class="form-control ho_chua_loai_cong" type="text" value="'+l.ho_chua_loai_cong+'"/></td></tr>'+
			'<tr><td><b>Khẩu độ cống:</b></td><td> <input class="form-control ho_chua_khau_do_cong" type="text" value="'+l.ho_chua_khau_do_cong+'"/></td></tr>'+
			'<tr><td><b>Chiều dài cống:</b></td><td> <input class="form-control ho_chua_chieu_dai_cong" type="text" value="'+l.ho_chua_chieu_dai_cong+'"/></td></tr>'+
			'<tr><td><b>Cao trình ngưỡng cống:</b></td><td> <input class="form-control ho_chua_cao_trinh_nguong_cong" type="text" value="'+l.ho_chua_cao_trinh_nguong_cong+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Nhà quản lý:</td></tr>'+
			'<tr><td><b>Loại nhà:</b></td><td> <input class="form-control ho_chua_loai_nha" type="text" value="'+l.ho_chua_loai_nha+'"/></td></tr>'+
			'<tr><td><b>Diện tích:</b></td><td> <input class="form-control ho_chua_dien_tich" type="text" value="'+l.ho_chua_dien_tich+'"/></td></tr>'+
			'<tr><td colspan="2" class="bg-success" style="color:white;">Dường vận hành:</td></tr>'+
			'<tr><td><b>Chất liệu:</b></td><td> <input class="form-control ho_chua_chat_lieu" type="text" value="'+l.ho_chua_chat_lieu+'"/></td></tr>'+
			'<tr><td><b>Chiều dài:</b></td><td> <input class="form-control ho_chua_chieu_dai" type="text" value="'+l.ho_chua_chieu_dai+'"/></td></tr>'+
			'<tr><td><b>Chiều rộng:</b></td><td> <input class="form-control ho_chua_chieu_rong" type="text" value="'+l.ho_chua_chieu_rong+'"/></td></tr>'+
		
			'<tr><td><b>Tọa độ cũ:</b></td><td><textarea class="form-control toadochung" />"'+lgeo.toString()+'"</textarea></td></tr>'+
			'<tr><td><b>Tọa độ mới:</b></td><td><textarea class="form-control toadochungnew" />"'+st_toa_do+'"</textarea></td></tr>';
        return html;
			    
}

function showcontent_ho_chua(l,lgeo){
	var html=
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông tin địa chỉ:</td></tr>'+
				
				'<tr>'+
				'<td><b>Tỉnh/Thành Phố:</b></td><td>'+l.nameprovince+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Quận/Huyện:</b></td>'+
				'<td>'+l.namedistrict+'</td>'+
				'</tr>'+
				'<tr><td><b>Xã/Phường:</b></td><td>'+l.namewards+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Địa chỉ:</b></td>'+
				'<td>'+l.addresschung+'</td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông tin công trình:</td></tr>'+

				'<tr><td><b>Tên hồ chứa:</b></td><td>'+l.ho_chua_ten_ho+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Cấp công trình:</b></td>'+
				'<td>'+l.ho_chua_cap_cong_trinh+'</td>'+
				'</tr>'+
				'<tr><td><b>Đơn vị thiết kế:</b></td><td>'+l.ho_chua_don_vi_thiet_ke+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Đơn vị thi công:</b></td>'+
				'<td>'+l.ho_chua_don_vi_thi_cong+'</td>'+
				'</tr>'+
				'<tr><td><b>Đơn vị quản lý:</b></td><td>'+l.ho_chua_don_vi_quan_ly+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Năm xây dựng:</b></td>'+
				'<td>'+l.ho_chua_nam_xay_dung+'</td>'+
				'</tr>'+
				'<tr><td><b>Năm hoàn thành:</b></td><td>'+l.ho_chua_nam_hoan_thanh+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Diện tích tưới:</b></td>'+
				'<td>'+l.ho_chua_dien_tich_tuoi+' m<sup>2</sup></td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông số thiết kế:</td></tr>'+
				'<tr><td><b>Diện tích lưu vực:</b></td><td>'+l.ho_chua_dien_tich_luu_vuc+' m <sup>2</sup></td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Diện tích hữu dụng:</b></td>'+
				'<td>'+l.ho_chua_dien_tich_huu_dung+' m <sup>2</sup></td>'+
				'</tr>'+
				'<tr><td><b>Mực nước dâng bình thường:</b></td><td>'+l.ho_chua_dien_tich_muc_nuoc_dang_binh_thuong+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Mực nước phòng lũ thiết kế:</b></td>'+
				'<td>'+l.ho_chua_muc_nuoc_phong_lu_thiet_ke+'</td>'+
				'</tr>'+
				'<tr><td><b>Mực nước chết:</b></td><td>'+l.ho_chua_muc_nuoc_chet+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td></td>'+
				'<td></td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông số thiết kế đập:</td></tr>'+
				'<tr><td><b>Loại đập:</b></td><td>'+l.ho_chua_loai_dap+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Bề rộng đập<b></td>'+
				'<td>'+l.ho_chua_be_rong_dap+'</td>'+
				'</tr>'+
				'<tr><td><b>Chiều cao đập:</b></td><td>'+l.ho_chua_chieu_cao_dap+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Độ dốc mái thượng lưu</b></td>'+
				'<td>'+l.ho_chua_doc_mai_thuong_luu+'</td>'+
				'</tr>'+
				'<tr><td><b>Độ dốc mái hạ lưu:</b></td><td>'+l.ho_chua_doc_mai_ha_luu+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td></td>'+
				'<td></td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông số thiết kế tràn:</td></tr>'+
				'<tr><td><b>Bề rộng tràn:</b></td><td>'+l.ho_chua_be_rong_tran+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Cao trình ngưỡng tràn</b></td>'+
				'<td>'+l.ho_chua_cao_trinh_nguong_tran+'</td>'+
				'</tr>'+
				'<tr><td><b>Q tràn:</b></td><td>'+l.ho_chua_q_tran+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td></td>'+
				'<td></td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Thông số Cống lấy nước từ đập:</td></tr>'+
				'<tr><td><b>Loại cống:</b></td><td>'+l.ho_chua_loai_cong+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Khẩu độ cống</b></td>'+
				'<td>'+l.ho_chua_khau_do_cong+'</td>'+
				'</tr>'+
				'<tr><td><b>Chiều dài cống:</b></td><td>'+l.ho_chua_chieu_dai_cong+' m </td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Cao trình ngưỡng cống</b></td>'+
				'<td>'+l.ho_chua_cao_trinh_nguong_cong+'</td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Nhà quản lý:</td></tr>'+
				'<tr><td><b>Loại nhà:</b></td><td>'+l.ho_chua_loai_nha+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Diện tích</b></td>'+
				'<td>'+l.ho_chua_dien_tich+' m<sup>2</sup></td>'+
				'</tr>'+
				'<tr><td colspan="5" class="bg-success" style="color:white;">Dường vận hành:</td></tr>'+
				'<tr><td><b>Chất liệu:</b></td><td>'+l.ho_chua_chat_lieu+'</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td><b>Chiều dài:</b></td>'+
				'<td>'+l.ho_chua_chieu_dai+' m</td>'+
				'</tr>'+
				'<tr><td><b>Chiều rộng:</b></td><td>'+l.ho_chua_chieu_rong+' m</td>'+
				'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
				'<td></td>'+
				'<td></td>'+
				'</tr>';
        return html;
			    
}
///////Ham showcontent view xem
function vieweditcontent(l,content,title){
				// var id = l.feature.properties.id;
				// $(".btndelview").attr("data-id", id);
				// $(".btneditview").attr("data-id", id);				
				if (l.feature.properties.idarea == "CTK") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.namecong);
					var html = showcontent_cong_tren_kenh(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				} else if (l.feature.properties.idarea == "HC") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.ho_chua_ten_ho);
					var html = showcontent_ho_chua(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				}
				else if (l.feature.properties.idarea == "KD") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.kenh_dan_ten);
					var html = showcontent_kenh_dan(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				} else if (l.feature.properties.idarea == "KT") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.khu_tuoi_ten);
					var html = showcontent_khu_tuoi(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				}
				else if (l.feature.properties.idarea == "MD") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_dat_du_an);
					var html = showcontent_mau_dat(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				} else if (l.feature.properties.idarea == "MN") {
					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_nuoc_du_an);
					var html = showcontent_mau_nuoc(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);
				} else if (l.feature.properties.idarea == "VTSL") {

					$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.vi_tri_sat_lo_cong_trinh);
					var html = showcontent_vi_tri_sat_lo(l.feature.properties.datalist, l.feature.geometry.coordinates)
					$("."+content).html(html);
					var arrimageview = l.feature.properties.datalist.listimage;
					var htmlimage = showimagetab(arrimageview, url);
					$("#carouselExampleIndicators").html(htmlimage);

				}
}
//edit
function vieweditcontentedit(l,content,title,lgeonew){
	
	if (l.feature.properties.idarea == "CTK") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.namecong);
		var html = showcontent_cong_tren_kenh_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
		
	} else if (l.feature.properties.idarea == "HC") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.ho_chua_ten_ho);
		var html = showcontent_ho_chua_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
	}
	else if (l.feature.properties.idarea == "KD") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.kenh_dan_ten);
		var html = showcontent_kenh_dan_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
		
	} else if (l.feature.properties.idarea == "KT") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.khu_tuoi_ten);
		var html = showcontent_khu_tuoi_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
	}
	else if (l.feature.properties.idarea == "MD") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_dat_du_an);
		var html = showcontent_mau_dat_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
	} else if (l.feature.properties.idarea == "MN") {
		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_nuoc_du_an);
		var html = showcontent_mau_nuoc_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
	} else if (l.feature.properties.idarea == "VTSL") {

		$("."+title).html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.vi_tri_sat_lo_cong_trinh);
		var html = showcontent_vi_tri_sat_lo_edit(l.feature.geometry.type,l.feature.properties.datalist, l.feature.geometry.coordinates,lgeonew)
		$("."+content).html(html);
		var arrimageview = l.feature.properties.datalist.listimage;
		arrimage_edit=arrimageview;
		showLinkImageEdit(arrimageview)
	}
}
function showLinkImageEdit(arr) {
	var t = '';
	for (var i in arr) {
	  var im = url + "serverfileupload/" + arr[i];
	  t = t + '<tr><td colspan="4"><div class="image">' +
		'<img width="300px" height="300px" src="' + im + '" class="img-circle elevation-2 addvartar" alt="avartar">' +
		'</div></td><td data-vt="' + i + '" data-url="' + arr[i] + '" class="click_xoa_image_edit">&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td></tr>';
	}
	$(".showlinkurl_edit").html(t);
  }
  function initUploadALLImageEdit(){
	
	var files = event.target.files;
		var countFile=files.length;
		for (var i in files) {
			if (typeof files[i] !== 'object') return false;
			(function () {		
                console.log(files[i]);	
					 $(".progresscommon").html("Đang tải file. Xin vui lòng chờ<br>");
					upload(files[i],function(res){	
                        //console.log(res);						
						ketquauploadimagedata_edit(JSON.parse(res));					
					});
			}());

		}

	
}
function ketquauploadimagedata_edit(oj) {

	if (oj.status == true) {
	  var img = oj.namefie;
	  urlimage = img;
	  alert_success("Tải File Thành công");
	  $(".progresscommon").html("");
	  arrimage_edit.push(urlimage)
	  showLinkImageEdit(arrimage_edit)
	  //$("#imgPreviewMH").attr("src","serverfileupload/"+img);		
	} else {
	  $(".progresscommon").html("");
	  alert_success("Tải File Không Thành công<br>" + oj.message);
	  urlimage = "";
	}
  }