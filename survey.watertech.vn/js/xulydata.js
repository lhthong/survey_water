//luu toa do thay doi
var lgeotest;
var lsave;//luu layer
var geojsonpointob;
var latold = 0;
var latnew = 0;
var lngold = 0;
var lngnew = 0;
var namecommon=""
var arrimage_edit = [];
$(document).ready(function () {
	////////////////////
	//Edit
	$(".btneditview").click(function () {

		var id = $(this).attr("data-id");
		var iduser = $(this).attr("data-iduser");
		var idarea = $(this).attr("data-idarea");

		$(".viewinfor").modal("hide");
		//showpROVINCE("cbprovinceedit");
		$(".viewinforedit").modal("show");
		$(".cbprovinceedit").val(lsave.feature.properties.datalist.idprovince)
		var idprovince=lsave.feature.properties.datalist.idprovince
		var iddistrict=lsave.feature.properties.datalist.iddistrict
		var idward=lsave.feature.properties.datalist.idwards
		var addresschung=lsave.feature.properties.datalist.addresschung
		$(".addresschungedit").val(addresschung)
	
		var datasend = {
			event: "getALLDistrictByID",
			code: idprovince
		
		  }
		 
		  queryData("php/api.php", datasend, function (res) {
		
			var data = res.items; //data=[{},{}]
			if (data.length == 0) {
			  $(".cbdistrictedit").html('<option value="NULL">Chọn Quận/Huyện</option>');
			} else {
			  var htmls = '<option value="NULL">Quận/Huyện</option>';
			  for (var item in data) {
				var obj = data[item];
				htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
			  }
			  $(".cbdistrictedit").html(htmls);
			  $(".cbdistrictedit").val(iddistrict)
			  var datasend = {
				event: "getALLWardByID",
				code: iddistrict
			
			  }
			  //console.log(datasend);
			  queryData("php/api.php", datasend, function (res) {
			
				var data = res.items; //data=[{},{}]
				if (data.length == 0) {
				  $(".cbwardsedit").html('<option value="NULL">Chọn Xã/Phường</option>');
				} else {
				  var htmls = '<option value="NULL">Chọn Xã/Phường</option>';
				  for (var item in data) {
					var obj = data[item];
					htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
				  }
				  $(".cbwardsedit").html(htmls);
				}
				$(".cbwardsedit").val(idward)
			  });



			}
		
		  });
		
		console.log(lsave);
		console.log(lgeotest);
		$(".btneupdateview").attr("data-id", id);
		$(".btneupdateview").attr("data-iduser", iduser);
		$(".btneupdateview").attr("data-idarea", idarea);
		document.querySelector("#imgiconareaedit").addEventListener('change', initUploadALLImageEdit);
		vieweditcontentedit(lsave, "addShowDataEdit", "addtitleviewedit", lgeotest)
	})
	$(".btncloseeditview").click(function () {
		$(".viewinforedit").modal("hide");
		$(".viewinfor").modal("show");
	})
	$(".cbprovinceedit").click( function () {
		var provinceid = $(".cbprovinceedit").val();

		showDistricts("cbdistrictedit", provinceid);
	
	})
	
	$(".cbdistrictedit").click( function () {
		var districtid = $(".cbdistrictedit").val();

		showWards("cbwardsedit", districtid);
	})
	//Luu thay doi
	$(".btneupdateview").click(function () {
		var geo = $(".btneupdateview").attr("data-geo");
		var idprovince = $(".cbprovinceedit").val();
		var nameprovince = $('.cbprovinceedit').find(":selected").text();
		var namedistrict = $('.cbdistrictedit').find(":selected").text();
		var namewards = $('.cbwardsedit').find(":selected").text();
		var iddistrict = $(".cbdistrictedit").val();
		var idwards = $(".cbwardsedit").val();
		var namearea = $(".btneupdateview").attr("data-namearea");
		var addresschung = $(".addresschungedit").val();
		var iduser = $(this).attr("data-iduser");
		var idarea = $(this).attr("data-idarea");
		var id = $(this).attr("data-id");
		geojsonpointob.properties.idarea = idarea
		geojsonpointob.properties.iduser = iduser
		if (idprovince == "NULL" || idprovince == null)
			alert_info("Phãi chọn tỉnh/Thành phố")
		else if (iddistrict == "NULL" || iddistrict == null) {
			alert_info("Phãi chọn Quận/Huyện")
		} else if (idwards == "NULL" || idwards == null) {
			alert_info("Phãi chọn Phường/Xã")
		} else {
		
			if (latnew == 0) {
				latold = latold
				lngold = lngold
			} else {
				latold = latnew
				lngold = lngnew
			}
			var oblnglat = {
				lng: lngold,
				lat: latold
			}
			if (idarea == "KD") {

				var kenh_dan_ten = $(".addShowDataEdit .kenh_dan_ten").val();
				namecommon=kenh_dan_ten
				var kenh_dan_ho_chua = $(".addShowDataEdit .kenh_dan_ho_chua").val();
				var kenh_dan_cap_kenh = $(".addShowDataEdit .kenh_dan_cap_kenh").val();
				var kenh_dan_loai_kenh = $(".addShowDataEdit .kenh_dan_loai_kenh").val();
				var kenh_dan_chieu_dai = $(".addShowDataEdit .kenh_dan_chieu_dai").val();
				var kenh_dan_nam_xay_dung = $(".addShowDataEdit .kenh_dan_nam_xay_dung").val();
				var kenh_dan_pham_vi_tuoi = $(".addShowDataEdit .kenh_dan_pham_vi_tuoi").val();
				

				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					kenh_dan_ten: kenh_dan_ten,
					kenh_dan_ho_chua: kenh_dan_ho_chua,
					kenh_dan_cap_kenh: kenh_dan_cap_kenh,
					kenh_dan_loai_kenh: kenh_dan_loai_kenh,
					kenh_dan_chieu_dai: kenh_dan_chieu_dai,
					kenh_dan_nam_xay_dung: kenh_dan_nam_xay_dung,
					kenh_dan_pham_vi_tuoi: kenh_dan_pham_vi_tuoi,
					toadochung: oblnglat,
					listimage: arrimage_edit

				}

				geojsonpointob.properties.datalist = data
			}
			if (idarea == "KT") {

				var khu_tuoi_ten = $(".addShowDataEdit .khu_tuoi_ten").val();
				namecommon=khu_tuoi_ten
				var khu_tuoi_nguon_nuoc = $(".addShowDataEdit .khu_tuoi_nguon_nuoc").val();
				var khu_tuoi_dien_tich_dat_cong_nghiep = $(".addShowDataEdit .khu_tuoi_dien_tich_dat_cong_nghiep").val();
				var khu_tuoi_dien_tich_dat_nong_nghiep = $(".addShowDataEdit .khu_tuoi_dien_tich_dat_nong_nghiep").val();
				var khu_tuoi_tong_chieu_dai_kenh_cap_1 = $(".addShowDataEdit .khu_tuoi_tong_chieu_dai_kenh_cap_1").val();
				var khu_tuoi_tong_chieu_dai_kenh_cap_2 = $(".addShowDataEdit .khu_tuoi_tong_chieu_dai_kenh_cap_2").val();
				
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					khu_tuoi_ten: khu_tuoi_ten,
					khu_tuoi_nguon_nuoc: khu_tuoi_nguon_nuoc,
					khu_tuoi_dien_tich_dat_cong_nghiep: khu_tuoi_dien_tich_dat_cong_nghiep,
					khu_tuoi_dien_tich_dat_nong_nghiep: khu_tuoi_dien_tich_dat_nong_nghiep,
					khu_tuoi_tong_chieu_dai_kenh_cap_1: khu_tuoi_tong_chieu_dai_kenh_cap_1,
					khu_tuoi_tong_chieu_dai_kenh_cap_2: khu_tuoi_tong_chieu_dai_kenh_cap_2,				
					toadochung: oblnglat,
					listimage: arrimage_edit

				}

				geojsonpointob.properties.datalist = data
			}
			if (idarea == "VTSL") {
				var vi_tri_sat_lo_cong_trinh = $(".addShowDataEdit .vi_tri_sat_lo_cong_trinh").val();
				namecommon=vi_tri_sat_lo_cong_trinh
				var vi_tri_sat_lo_chieu_dai = $(".addShowDataEdit .vi_tri_sat_lo_chieu_dai").val();
				var vi_tri_sat_lo_chieu_rong = $(".addShowDataEdit .vi_tri_sat_lo_chieu_rong").val();
				var vi_tri_sat_lo_muc_do_nguy_hiem = $(".addShowDataEdit .vi_tri_sat_lo_muc_do_nguy_hiem").val();				
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					vi_tri_sat_lo_cong_trinh: vi_tri_sat_lo_cong_trinh,
					vi_tri_sat_lo_chieu_rong: vi_tri_sat_lo_chieu_rong,
					vi_tri_sat_lo_chieu_dai: vi_tri_sat_lo_chieu_dai,
					vi_tri_sat_lo_muc_do_nguy_hiem: vi_tri_sat_lo_muc_do_nguy_hiem,
				
					toadochung: oblnglat,
					listimage: arrimage_edit

				}

				geojsonpointob.properties.datalist = data
			}
			if (idarea == "MN") {
				var mau_nuoc_du_an = $(".addShowDataEdit .mau_nuoc_du_an").val();
				namecommon=mau_nuoc_du_an
				var mau_nuoc_ky_hieu_mau = $(".addShowDataEdit .mau_nuoc_ky_hieu_mau").val();
				var mau_nuoc_ngay_lay_mau = $(".addShowDataEdit .mau_nuoc_ngay_lay_mau").val();
				var mau_nuoc_nguoi_lay_mau = $(".addShowDataEdit .mau_nuoc_nguoi_lay_mau").val();
				var mau_nuoc_so_chi_tieu = $(".addShowDataEdit .mau_nuoc_so_chi_tieu").val();
			
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					mau_nuoc_du_an: mau_nuoc_du_an,
					mau_nuoc_ky_hieu_mau: mau_nuoc_ky_hieu_mau,
					mau_nuoc_ngay_lay_mau: mau_nuoc_ngay_lay_mau,
					mau_nuoc_nguoi_lay_mau: mau_nuoc_nguoi_lay_mau,
					mau_nuoc_so_chi_tieu: mau_nuoc_so_chi_tieu,		
					toadochung: oblnglat,
					listimage: arrimage_edit
				}
				geojsonpointob.properties.datalist = data
			}
			if (idarea == "MD") {
				var mau_dat_du_an = $(".addShowDataEdit .mau_dat_du_an").val();
				namecommon=mau_dat_du_an
				var mau_dat_ky_hieu_mau = $(".addShowDataEdit .mau_dat_ky_hieu_mau").val();
				var mau_dat_ngay_lay_mau = $(".addShowDataEdit .mau_dat_ngay_lay_mau").val();
				var mau_dat_nguoi_lay_mau = $(".addShowDataEdit .mau_dat_nguoi_lay_mau").val();
				var mau_dat_so_chi_tieu = $(".addShowDataEdit .mau_dat_so_chi_tieu").val();			
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					mau_dat_du_an: mau_dat_du_an,
					mau_dat_ky_hieu_mau: mau_dat_ky_hieu_mau,
					mau_dat_ngay_lay_mau: mau_dat_ngay_lay_mau,
					mau_dat_nguoi_lay_mau: mau_dat_nguoi_lay_mau,
					mau_dat_so_chi_tieu: mau_dat_so_chi_tieu,		
					toadochung: oblnglat,
					listimage: arrimage_edit
				}
				geojsonpointob.properties.datalist = data
			}

			if (idarea == "CTK") {
				var namecong = $(".addShowDataEdit .namecong").val();
				namecommon=namecong
				var khaudocong = $(".addShowDataEdit .khaudocong").val();
				var loaicong = $(".addShowDataEdit .loaicong").val();
				var namxdcong = $(".addShowDataEdit .namxdcong").val();
				var dtdatcongnghiepcong = $(".addShowDataEdit .dtdatcongnghiepcong").val();
				var caotrinhdaycong = $(".addShowDataEdit .caotrinhdaycong").val();
				var kenhdancong = $(".addShowDataEdit .kenhdancong").val();
			
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					namecong: namecong,
					khaudocong: khaudocong,
					loaicong: loaicong,
					namxdcong: namxdcong,
					dtdatcongnghiepcong: dtdatcongnghiepcong,
					caotrinhdaycong: caotrinhdaycong,
					kenhdancong: kenhdancong,		
					toadochung: oblnglat,
					listimage: arrimage_edit

				}

				geojsonpointob.properties.datalist = data
			}
		if (idarea == "HC") {
				var ho_chua_ten_ho = $(".addShowDataEdit .ho_chua_ten_ho").val();
				namecommon=ho_chua_ten_ho
				var ho_chua_cap_cong_trinh = $(".addShowDataEdit .ho_chua_cap_cong_trinh").val();
				var ho_chua_don_vi_thiet_ke = $(".addShowDataEdit .ho_chua_don_vi_thiet_ke").val();
				var ho_chua_don_vi_thi_cong = $(".addShowDataEdit .ho_chua_don_vi_thi_cong").val();
				var ho_chua_don_vi_quan_ly = $(".addShowDataEdit .ho_chua_don_vi_quan_ly").val();
				var ho_chua_nam_xay_dung = $(".addShowDataEdit .ho_chua_nam_xay_dung").val();
				var ho_chua_nam_hoan_thanh = $(".addShowDataEdit .ho_chua_nam_hoan_thanh").val();
				var ho_chua_dien_tich_tuoi = $(".addShowDataEdit .ho_chua_dien_tich_tuoi").val();
				var ho_chua_dien_tich_luu_vuc = $(".addShowDataEdit .ho_chua_dien_tich_luu_vuc").val();
				var ho_chua_dien_tich_huu_dung = $(".addShowDataEdit .ho_chua_dien_tich_huu_dung").val();
				var ho_chua_dien_tich_muc_nuoc_dang_binh_thuong = $(".addShowDataEdit .ho_chua_dien_tich_muc_nuoc_dang_binh_thuong").val();
				var ho_chua_muc_nuoc_phong_lu_thiet_ke = $(".addShowDataEdit .ho_chua_muc_nuoc_phong_lu_thiet_ke").val();
				var ho_chua_muc_nuoc_chet = $(".addShowDataEdit .ho_chua_muc_nuoc_chet").val();
				var ho_chua_loai_dap = $(".addShowDataEdit .ho_chua_loai_dap").val();

				var ho_chua_be_rong_dap = $(".addShowDataEdit .ho_chua_be_rong_dap").val();
				var ho_chua_chieu_cao_dap = $(".addShowDataEdit .ho_chua_chieu_cao_dap").val();
				var ho_chua_doc_mai_thuong_luu = $(".addShowDataEdit .ho_chua_doc_mai_thuong_luu").val();
				var ho_chua_doc_mai_ha_luu = $(".addShowDataEdit .ho_chua_doc_mai_ha_luu").val();
				var ho_chua_be_rong_tran = $(".addShowDataEdit .ho_chua_be_rong_tran").val();
				var ho_chua_cao_trinh_nguong_tran = $(".addShowDataEdit .ho_chua_cao_trinh_nguong_tran").val();
				var ho_chua_q_tran = $(".addShowDataEdit .ho_chua_q_tran").val();
				var ho_chua_loai_cong = $(".addShowDataEdit .ho_chua_loai_cong").val();
			

				var ho_chua_khau_do_cong = $(".addShowDataEdit .ho_chua_khau_do_cong").val();
				var ho_chua_chieu_dai_cong = $(".addShowDataEdit .ho_chua_chieu_dai_cong").val();
				var ho_chua_cao_trinh_nguong_cong = $(".addShowDataEdit .ho_chua_cao_trinh_nguong_cong").val();
				var ho_chua_loai_nha = $(".addShowDataEdit .ho_chua_loai_nha").val();


				var ho_chua_dien_tich = $(".addShowDataEdit .ho_chua_dien_tich").val();
				var ho_chua_chat_lieu = $(".addShowDataEdit .ho_chua_chat_lieu").val();
				var ho_chua_chieu_dai = $(".addShowDataEdit .ho_chua_chieu_dai").val();
				var ho_chua_chieu_rong = $(".addShowDataEdit .ho_chua_chieu_rong").val();
				var data = {
					idprovince: idprovince,
					nameprovince: nameprovince,
					iddistrict: iddistrict,
					namedistrict: namedistrict,
					idwards: idwards,
					addresschung: addresschung,
					namewards: namewards,
					namearea: namearea,
					ho_chua_ten_ho: ho_chua_ten_ho,
					ho_chua_cap_cong_trinh: ho_chua_cap_cong_trinh,
					ho_chua_don_vi_thiet_ke: ho_chua_don_vi_thiet_ke,
					ho_chua_don_vi_thi_cong: ho_chua_don_vi_thi_cong,
					ho_chua_don_vi_quan_ly: ho_chua_don_vi_quan_ly,
					ho_chua_nam_xay_dung: ho_chua_nam_xay_dung,
					ho_chua_nam_hoan_thanh: ho_chua_nam_hoan_thanh,	
					ho_chua_dien_tich_tuoi: ho_chua_dien_tich_tuoi,
					ho_chua_dien_tich_luu_vuc: ho_chua_dien_tich_luu_vuc,
					ho_chua_dien_tich_huu_dung: ho_chua_dien_tich_huu_dung,
					ho_chua_dien_tich_muc_nuoc_dang_binh_thuong: ho_chua_dien_tich_muc_nuoc_dang_binh_thuong,
					ho_chua_muc_nuoc_phong_lu_thiet_ke: ho_chua_muc_nuoc_phong_lu_thiet_ke,
					ho_chua_muc_nuoc_chet: ho_chua_muc_nuoc_chet,
					ho_chua_loai_dap: ho_chua_loai_dap,	
					ho_chua_be_rong_dap: ho_chua_be_rong_dap,	
					ho_chua_chieu_cao_dap: ho_chua_chieu_cao_dap,	
					ho_chua_doc_mai_ha_luu: ho_chua_doc_mai_ha_luu,	
					ho_chua_doc_mai_thuong_luu: ho_chua_doc_mai_thuong_luu,	
					ho_chua_be_rong_tran: ho_chua_be_rong_tran,	
					ho_chua_cao_trinh_nguong_tran: ho_chua_cao_trinh_nguong_tran,	
					ho_chua_q_tran: ho_chua_q_tran,	
					ho_chua_loai_cong: ho_chua_loai_cong,	
					ho_chua_khau_do_cong: ho_chua_khau_do_cong,	
					ho_chua_chieu_dai_cong: ho_chua_chieu_dai_cong,	
					ho_chua_cao_trinh_nguong_cong: ho_chua_cao_trinh_nguong_cong,	
					ho_chua_loai_nha: ho_chua_loai_nha,
					ho_chua_dien_tich: ho_chua_dien_tich,	
					ho_chua_chat_lieu: ho_chua_chat_lieu,	
					ho_chua_chieu_dai: ho_chua_chieu_dai,
					ho_chua_chieu_rong: ho_chua_chieu_rong,		
					toadochung: oblnglat,
					listimage: arrimage_edit

				}

				geojsonpointob.properties.datalist = data
			}
			//geojsonpointob.properties.iduser=myUser.items[0].iduser
			var datasend = {
				event: "UpdateDataCollected",
				id: id,
				idprovince: idprovince,
				iddistrict: iddistrict,
				idward: idwards,
				address: addresschung,
				
				iduserchange:myUser.items[0].iduser,
				idarea: idarea,
				namecommon:namecommon,
				data: JSON.stringify(geojsonpointob),
				toadochung: JSON.stringify(oblnglat),
			}
			
			queryData("php/api.php", datasend, function (res) {
				console.log(res)
				if (res.success == 1) {

					alert_info("Cập nhật thông tin thành công")
					latnew = 0;
					latlng = 0;

					$('.viewinforedit').modal('hide');
				} else {
					alert_info("Cập nhật thông tin thất bại")
					latnew = 0;
					latlng = 0;
				}
			});
		}
	});
	////////////////////////////////////
	$(".btndelview").click(function () {
		var id = $(this).attr("data-id");
		deleteDataAreaID(id, "viewinfor")
	})
	$(".btncloseview").click(function () {
		$(".viewinfor").modal("hide");
	})
	$(".cbprovince").click(function () {
		var provinceid = $(".cbprovince").val();



		showDistricts("cbdistrict", provinceid);
	})
	$(".cbdistrict").click(function () {
		var districtid = $(".cbdistrict").val();



		showWards("cbwards", districtid);
	})
	//filer ban do
	$(".cbprovincefilter").click(function () {
		var provinceid = $(".cbprovincefilter").val();

		showDistricts("cbdistrictfilter", provinceid);
	})
	$(".cbdistrictfilter").click(function () {
		var districtid = $(".cbdistrictfilter").val();

		showWards("cbwardsfilter", districtid);
	})
	//check all

	$(".btnfiltermap").click(function () {
		latold = 0;
		latnew = 0;
		lngold = 0;
		lngnew = 0;
		for (; Object.keys(map._layers).length > 1;) {
			map.removeLayer(map._layers[Object.keys(map._layers)[1]]);

		}

		//$('.leaflet-control-layers-selector')[1].click()
		var lay= $(".chooselayermap").val();
     if(lay=="osmLayer")
      $('.leaflet-control-layers-selector')[0].click();
     else if(lay=="topoLayer"){
      $('.leaflet-control-layers-selector')[1].click();
     }
		var selected = new Array();
		$(".checkSingle").each(function () {
			if (this.checked)

				selected.push($(this).val());
		});
		//console.log(selected)
		var idprovince = $(".cbprovincefilter").val();
		var iddistrict = $(".cbdistrictfilter").val();
		var idward = $(".cbwardsfilter").val();
		var s = '(';
		if (selected.length == 0) {
			alert_info("Phải chọn ít nhất lĩnh vực để tìm");
		} else if (selected.length == 1) {
			s = s + '\'' + selected[0] + '\'';
		}
		else {
			for (var i = 0; i < selected.length - 1; i++) {
				s = s + '\'' + selected[i] + '\'' + ",";
			}
			s = s + '\'' + selected[i] + '\'';
		}
		s = s + ')';

		var datasend = {
			event: "getDataIsCollect",
			idprovince: idprovince,
			iddistrict: iddistrict,
			idward: idward,
			listarea: s
		}
		console.log(datasend)
		queryData("php/api.php", datasend, function (res) {

			console.log(res)
			//console.log(res.features)
			const theCollection = L.geoJson(res, {
				style: function (feature) {
					switch (feature.properties.idarea) {
						case 'CTK': return { color: "#FFFF00", weight: 2, opacity: 0.9 };
						case 'HC': return { color: "#0099FF", weight: 2, opacity: 0.9 };
						case 'MD': return { color: "#FF6600", weight: 2, opacity: 0.9 };
						case 'MN': return { color: "#FF33CC", weight: 2, opacity: 0.9 };
						case 'VTSL': return { color: "#FF0000", weight: 2, opacity: 0.9 };
						case 'KD': return { color: "#800080", weight: 2, opacity: 0.9 };
						case 'KT': return { color: "#00FF33", weight: 2, opacity: 0.9 };
					}
				},
				pointToLayer: (feature, latlng) => {

					// if (feature.properties.customGeometry) {
					// 	return new L.Circle(latlng, feature.properties.customGeometry.radius);
					// } else {
						var markerIcon1 = L.icon({
							iconUrl: 'icon/h1.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon2 = L.icon({
							iconUrl: 'icon/h2.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon3 = L.icon({
							iconUrl: 'icon/h3.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon4 = L.icon({
							iconUrl: 'icon/h4.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon5 = L.icon({
							iconUrl: 'icon/h5.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon6 = L.icon({
							iconUrl: 'icon/h6.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						var markerIcon7 = L.icon({
							iconUrl: 'icon/h7.png',
							iconSize: [38, 38], // kích thước của biểu tượng
							iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
							popupAnchor: [0, -30] // tọa độ popup của biểu tượng
						});
						switch (feature.properties.idarea) {

							case 'CTK': return new L.Marker(latlng, { icon: markerIcon2 }, { draggable: true });
							case 'HC': return new L.Marker(latlng, { icon: markerIcon5 }, { draggable: true });
							case 'MD': return new L.Marker(latlng, { icon: markerIcon1 }, { draggable: true });
							case 'MN': return new L.Marker(latlng, { icon: markerIcon6 }, { draggable: true });
							case 'VTSL': return new L.Marker(latlng, { icon: markerIcon7 }, { draggable: true });
							case 'KD': return new L.Marker(latlng, { icon: markerIcon3 }, { draggable: true });
							case 'KT': return new L.Marker(latlng, { icon: markerIcon4 }, { draggable: true });
						}

					//}
				},
				onEachFeature: (feature, layer) => {
					
					layer.on('pm:edit', function (e) {
						
						lgeotest = e.layer.feature.geometry.coordinates;
						
						if (layer.pm._shape == "Marker") {
							lgeotest = e.layer._latlng;
							
							latnew = lgeotest.lat;
							lngnew = lgeotest.lng;
							
							var points = {

								type: 'Feature',


								properties: {
									idarea: "",

									iduser: "0",
									datalist: {},
								},
								geometry: {
									type: 'Point',
									coordinates: [lgeotest.lng, lgeotest.lat],
								},
							}
							//$(".toadochung").val(layer._latlng.lng + "," + layer._latlng.lat);
							geojsonpointob = points;
						}else if(layer.pm._shape == "Line"){
							lgeotest = e.layer._latlngs;
							

							var arr = lgeotest;
							latnew = arr[0].lat;
							lngnew = arr[0].lng;
							
							var arrcor = []
							for (var i = 0; i < arr.length; i++) {
					  
							  var a = [arr[i].lng, arr[i].lat];
							  arrcor.push(a);
							}
							var points = {
							  type: 'Feature',
							  properties: {
								idarea: "",
								iduser: "0",
								datalist: {},
							  },
							  geometry: {
								type: 'LineString',
								coordinates: 
								  arrcor
								  ,
								
							  },
						} 
						geojsonpointob = points;
					}
						else {
							lgeotest = e.layer._latlngs[0];
							
							var arr = lgeotest;
							latnew = arr[0].lat;
							lngnew = arr[0].lng;
							
							var arrcor = []
							for (var i in arr) {
								//  console.log(arr[i])
								var a = [arr[i].lng, arr[i].lat];
								arrcor.push(a);


							}

							// console.log(arrcor)
							var points = {

								type: 'Feature',
								properties: {
									idarea: "",

									iduser: "0",
									datalist: {},
								},
								geometry: {
									type: 'Polygon',
									coordinates: [

										arrcor
										,
									],
								},
							}
							//$(".toadochung").val(arrcor);
							geojsonpointob = points;
						}

					});
					if (feature.properties.idarea == "CTK") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.namecong);
					} else if (feature.properties.idarea == "HC") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.ho_chua_ten_ho);
					}
					else if (feature.properties.idarea == "KD") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.kenh_dan_ten);
					} else if (feature.properties.idarea == "KT") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.khu_tuoi_ten);
					}
					else if (feature.properties.idarea == "MD") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.mau_dat_du_an);
					} else if (feature.properties.idarea == "MN") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.mau_nuoc_du_an);
					} else if (feature.properties.idarea == "VTSL") {

						layer.bindPopup(feature.properties.datalist.namearea + "<br>" + feature.properties.datalist.vi_tri_sat_lo_cong_trinh);
					}
					layer.addTo(map);

				}

			});
			theCollection.on('click', function (e) {
				// console.log(e)
				// console.log(myUser);
				$(".addtitleview").html("")
				$(".addShowData").html("");
				$("#carouselExampleIndicators").html("");
				$('.viewinfor').modal('show');
				var l = e.layer
				lsave = e.layer
				var id = l.feature.properties.id;
				var iduser = l.feature.properties.iduser;
				var idarea = l.feature.properties.idarea;
				$(".btndelview").attr("data-id", id);
				$(".btneditview").attr("data-id", id);
				$(".btneditview").attr("data-iduser", iduser);
				$(".btneditview").attr("data-idarea", idarea);
				vieweditcontent(l, "addShowData", "addtitleview")
				if (e.layer.pm._shape == "Marker") {
					lgeotest = e.layer._latlng;
				
					latold = lgeotest.lat;
					lngold = lgeotest.lng;
					var points = {
						type: 'Feature',
						properties: {
							idarea: "",
							iduser: "0",
							datalist: {},
						},
						geometry: {
							type: 'Point',
							coordinates: [lgeotest.lng, lgeotest.lat],
						},
					}
					//$(".toadochung").val(layer._latlng.lng + "," + layer._latlng.lat);
					geojsonpointob = points;
				}else if (e.layer.pm._shape == "Line") {

					lgeotest = e.layer._latlngs;
					console.log(lgeotest);

					var arr = lgeotest;
					latold = arr[0].lat;
					lngold = arr[0].lng;
					var arrcor = []
					for (var i in arr) {
						//  console.log(arr[i])
						var a = [arr[i].lng, arr[i].lat];
						arrcor.push(a);


					}

					// console.log(arrcor)
					var points = {

						type: 'Feature',
						properties: {
							idarea: "",

							iduser: "0",
							datalist: {},
						},
						geometry: {
							type: 'LineString',
							coordinates: 

								arrcor
								,
							
						},
					}
					//$(".toadochung").val(arrcor);
					geojsonpointob = points;
				} 
				
				
				else {
					lgeotest = e.layer._latlngs[0];
					console.log(lgeotest);

					var arr = lgeotest;
					latold = arr[0].lat;
					lngold = arr[0].lng;
					var arrcor = []
					for (var i in arr) {
						//  console.log(arr[i])
						var a = [arr[i].lng, arr[i].lat];
						arrcor.push(a);


					}

					// console.log(arrcor)
					var points = {

						type: 'Feature',
						properties: {
							idarea: "",

							iduser: "0",
							datalist: {},
						},
						geometry: {
							type: 'Polygon',
							coordinates: [

								arrcor
								,
							],
						},
					}
					//$(".toadochung").val(arrcor);
					geojsonpointob = points;
				}


			});

			theCollection.on('mouseover', function (e) {
				//console.log(e.layer)
				var l = e.layer

				if (l.feature.properties.idarea == "CTK") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.namecong);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.namecong);

				} else if (l.feature.properties.idarea == "HC") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.ho_chua_ten_ho);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.ho_chua_ten_ho);
				}
				else if (l.feature.properties.idarea == "KD") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.kenh_dan_ten);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.kenh_dan_ten);
				} else if (l.feature.properties.idarea == "KT") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.khu_tuoi_ten);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.khu_tuoi_ten);
				}
				else if (l.feature.properties.idarea == "MD") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_dat_du_an);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.mau_dat_du_an);
				} else if (l.feature.properties.idarea == "MN") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.mau_nuoc_du_an);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.mau_nuoc_du_an);
				} else if (l.feature.properties.idarea == "VTSL") {
					$(".addtitleview").html(l.feature.properties.datalist.namearea + "-" + l.feature.properties.datalist.vi_tri_sat_lo_cong_trinh);
					l.bindPopup(l.feature.properties.datalist.namearea + "<br>" + l.feature.properties.datalist.vi_tri_sat_lo_cong_trinh);
				}

				l.openPopup()
			});
			//console.log(map);
			theCollection.addTo(map);

		});
	})

	$("#checkedAll").change(function () {
		if (this.checked) {

			$(".checkSingle").each(function () {
				//console.log("check"
				this.checked = true;
			})
		} else {

			$(".checkSingle").each(function () {
				this.checked = false;
			})
		}
	});

	$(".filtermap").on('click', '.checkSingle', function () {
		var isAllChecked = 0;

		if ($(this).is(":checked")) {

			$(".checkSingle").each(function () {
				if (!this.checked)
					isAllChecked = 1;
			})
			if (isAllChecked == 0) {

				$("#checkedAll").prop("checked", true);
			}
		} else {

			$("#checkedAll").prop("checked", false);
		}
	});
	////Edit data and remove image
	$(".content").on('click', '.click_xoa_image_edit', function (e) {
		var id = $(this).parent().parent().attr("data-id");
		var url = $(this).attr("data-url");
		var vt = $(this).attr("data-vt");
		arrimage_edit.splice(vt, 1);
		showLinkImageEdit(arrimage_edit)
	

	})

})


