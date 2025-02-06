var url = "https://survey.watertech.vn/";
var arrimage = [];
var urlimage = "";
var namecommon=""
const map = L.map('example2').setView([15.45350814059372, 106.27856084455142], 6);//.addLayer(tiles1);
var latpos = 0;
var lngpos = 0;
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
const osmLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);


var topoLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { //tạo layer tile từ google vệ tinh
  maxZoom: 19,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

//thay đổi layer hiển thị
var baseMaps = {
  'Bản Đồ Leaflet': osmLayer,
  'Bản Đồ Vệ Tinh': topoLayer,
};

L.control.layers(baseMaps).addTo(map);

// Tạo icon marker
var markerIcon = L.icon({
  iconUrl: 'icon/i1.png',
  iconSize: [38, 38], // kích thước của biểu tượng
  iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
  popupAnchor: [0, -30] // tọa độ popup của biểu tượng
});
var marker;
// // Lấy vị trí của mình
// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;

//     // Hiển thị bản đồ tại vị trí của mình
//     map.setView([lat, lng], 19);

//     // // Thêm marker tại vị trí của mình
//     // marker = L.marker([lat, lng], { icon: markerIcon }).addTo(markersLayer);
//     // marker.bindPopup('Your location');
//     marker = new L.Marker([lat, lng], { icon: markerIcon }, { draggable: true });
//     map.addLayer(marker);
//     marker.bindPopup("<b>Bạn đang ở đây</b>.").openPopup();
//   });
// }

map.dragging.enable()
////////////
//Tạo nút location để di chuyển về vị trí hiện tại
var locationButton = L.easyButton({
  position: 'topright',
  states: [{
    stateName: 'location',
    icon: 'fa fa-location-arrow',
    title: 'Quay lại vị trí hiện tại',
    onClick: function (btn, map) {
      if (navigator.geolocation) {
        //map.removeLayer(marker)
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          map.setView([lat, lng], 19);
          marker = new L.Marker([lat, lng], { icon: markerIcon }, { draggable: true });
          map.addLayer(marker);

          marker.bindPopup("<b>Bạn đang ở đây.").openPopup();

        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }]
});
// Thêm button vào bản đồ
locationButton.addTo(map);
////////////
$(document).ready(function () {
  
  $(".chooselayermap").click(function(){
    var lay= $(".chooselayermap").val();
     if(lay=="osmLayer")
      $('.leaflet-control-layers-selector')[0].click();
     else if(lay=="topoLayer"){
      $('.leaflet-control-layers-selector')[1].click();
     }
  })
  myUser = JSON.parse(localStorage.getItem("usersurveytlus"));
  if (myUser == undefined || myUser == null || myUser == "") {

    location.href = "login.html";
  }
  else {
    var p = myUser.items[0].permission;
    // console.log(p);
    if (p == 0) {
      $(".leaflet-pm-edit").removeClass("is-hidden")

      var pp = {
        drawMarker: true,
        drawPolygon: true,
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        editMode: true,
        drawPolyline: true,
        removalMode: false
      }

      map.pm.addControls(pp);
      $(".leaflet-pm-icon-cut").parent().hide();


    } else if (p == 1) {
      $(".leaflet-pm-edit").removeClass("is-hidden")
      $(".btndelview").hide();

      var pp = {
        drawMarker: true,
        drawPolygon: true,
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        editMode: true,
        drawPolyline: true,
        removalMode: false
      }
      map.pm.addControls(pp);
      $(".leaflet-pm-icon-cut").parent().hide();

    } else if (p == 2) {
      $(".leaflet-pm-edit").addClass("is-hidden")
      $(".btneditview").hide();
      $(".btndelview").hide();
    }

  }


  var iduser = 0;
  var flag = 0;
  showDataAreaFilter();
  showpROVINCE("cbprovincefilter");

  var geojsonpointob;
  myUser = JSON.parse(localStorage.getItem("usersurveytlus"));
  if (myUser == undefined || myUser == null || myUser == "") {
    iduser = 0;
    location.href = "login.html";
  } else {
    iduser = myUser.items[0].iduser
  }
  map.pm.enableDraw('Line', { allowSelfIntersection: false });
  map.pm.disableDraw('Line');

  map.on('pm:create', function (e) {

    $('.showchoosearea').modal('show');

    flag = 1;
    showDataChoose();
    const layer = e.layer;
    //console.log(layer.pm._shape);
    if (layer.pm._shape == "Marker") {
      latpos = layer._latlng.lat;
      lngpos = layer._latlng.lng;
      var points = {
        type: 'Feature',
        properties: {
          idarea: "",
          iduser: "0",
          datalist: {},
        },
        geometry: {
          type: 'Point',
          coordinates: [layer._latlng.lng, layer._latlng.lat],
        },
      }
      $(".toadochung").val(layer._latlng.lng + "," + layer._latlng.lat);
      geojsonpointob = points;
    }
    if (layer.pm._shape == "Line") {
      var arr = layer._latlngs;
      latpos = arr[0].lat;
      lngpos = arr[0].lng;
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
      $(".toadochung").val(arrcor);
      geojsonpointob = points;
    }
    if (layer.pm._shape == "Rectangle") {
      var arr = layer._latlngs[0];
      latpos = arr[0].lat;
      lngpos = arr[0].lng;
      var arrcor = []
      for (var i in arr) {
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
          type: 'Polygon',
          coordinates: [

            arrcor
            ,
          ],
        },
      }
      $(".toadochung").val(arrcor);
      geojsonpointob = points;
    }
    if (layer.pm._shape == "Polygon") {

      var arr = layer._latlngs[0];
      latpos = arr[0].lat;
      lngpos = arr[0].lng;
      var arrcor = []
      for (var i in arr) {

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
          type: 'Polygon',
          coordinates: [
            arrcor
            ,
          ],
        },
      }
      $(".toadochung").val(arrcor);
      geojsonpointob = points;
 
    }
  
  });
  function swapForm(tenhienthi) {
    $(".vi_tri_sat_lo").addClass("is-hidden");
    $(".mau_dat").addClass("is-hidden");
    $(".mau_nuoc").addClass("is-hidden");
    $(".khu_tuoi").addClass("is-hidden");
    $(".cong_tren_kenh").addClass("is-hidden");
    $(".kenh_dan").addClass("is-hidden");
    $(".ho_chua").addClass("is-hidden");
    $("." + tenhienthi).removeClass("is-hidden"); //hiển thị form lên
  }
  //refress lai area
  $(".bntrefesharea").click(function () {
    showDataChoose();
  });
  //Chọn lĩnh vực 
  $(".addDataArea").click(function () {
    // console.log("abc")
    urlimage = "";
    arrimage = [];
    document.querySelector("#imgiconarea").addEventListener('change', initUploadALLImage);
    $(".tinhhuyenxa").removeClass("is-hidden");
    $(".addfooter").removeClass("is-hidden");
    showpROVINCE("cbprovince");

    var st = $(".addDataArea").val();
    $(".addDataArea select").val(st);
    if (st == "VTSL") {
      swapForm("vi_tri_sat_lo");

    } else if (st == "MD") {
      swapForm("mau_dat");
    } else if (st == "MN") {
      swapForm("mau_nuoc");
    } else if (st == "KT") {
      swapForm("khu_tuoi");
    } else if (st == "CTK") {
      swapForm("cong_tren_kenh");

    } else if (st == "KD") {
      swapForm("kenh_dan");
    } else if (st == "HC") {
      swapForm("ho_chua");
    } else {
      swapForm("none");
    }
    $(".toadochung").val(geojsonpointob.geometry.coordinates);
  });

  $(".content").on('click', '.btnluu', function (e) {
    var txtarea = $(".addDataArea").val();
    geojsonpointob.properties.iduser = iduser;
    geojsonpointob.properties.idarea = txtarea;
    var namearea = $('.addDataArea').find(":selected").text();
    var idprovince = $(".cbprovince").val();
    var iddistrict = $(".cbdistrict").val();
    var idwards = $(".cbwards").val();
    if (idprovince == "NULL" || idprovince == null)
      alert_info("Phải chọn tỉnh/Thành phố")
    else if (iddistrict == "NULL" || iddistrict == null) {
      alert_info("Phải chọn Quận/Huyện")
    } else if (idwards == "NULL" || idwards == null) {
      alert_info("Phải chọn Phường/Xã")
    } else {
      $(".cbprovince select").val(idprovince);
      $(".cbdistrict select").val(iddistrict);
      $(".cbwards select").val(idwards);
      var nameprovince = $('.cbprovince').find(":selected").text();
      var namedistrict = $('.cbdistrict').find(":selected").text();
      var namewards = $('.cbwards').find(":selected").text();
      var addresschung = $(".addresschung").val();
      if (txtarea == "CTK") {

        var namecong = $(".namecong").val();
        namecommon=namecong;
        var khaudocong = $(".khaudocong").val();
        var loaicong = $(".loaicong").val();
        var namxdcong = $(".namxdcong").val();
        var dtdatcongnghiepcong = $(".dtdatcongnghiepcong").val();
        var caotrinhdaycong = $(".caotrinhdaycong").val();
        var kenhdancong = $(".kenhdancong").val();
        // var toadochung = $(".toadochung").val();
        // var arrtoado = toadochung.split(",")

        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          listimage: arrimage

        }

        geojsonpointob.properties.datalist = data
      } else if (txtarea == "MD") {

        var mau_dat_du_an = $(".mau_dat_du_an").val();
        var mau_dat_ky_hieu_mau = $(".mau_dat_ky_hieu_mau").val();
        var mau_dat_nguoi_lay_mau = $(".mau_dat_nguoi_lay_mau").val();
        var mau_dat_so_chi_tieu = $(".mau_dat_so_chi_tieu").val();
        var mau_dat_ngay_lay_mau = $(".mau_dat_ngay_lay_mau").val();
        namecommon=mau_dat_du_an
        // var toadochung = $(".toadochung").val();
        // var arrtoado = toadochung.split(",")
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          mau_dat_nguoi_lay_mau: mau_dat_nguoi_lay_mau,
          mau_dat_so_chi_tieu: mau_dat_so_chi_tieu,
          mau_dat_ngay_lay_mau: mau_dat_ngay_lay_mau,
          toadochung: oblnglat,
          listimage: arrimage

        }
        geojsonpointob.properties.datalist = data
      } else if (txtarea == "MN") {
        var mau_nuoc_du_an = $(".mau_nuoc_du_an").val();
        var mau_nuoc_ky_hieu_mau = $(".mau_nuoc_ky_hieu_mau").val();
        var mau_nuoc_nguoi_lay_mau = $(".mau_nuoc_nguoi_lay_mau").val();
        var mau_nuoc_so_chi_tieu = $(".mau_nuoc_so_chi_tieu").val();
        var mau_nuoc_ngay_lay_mau = $(".mau_nuoc_ngay_lay_mau").val();
        namecommon=mau_nuoc_du_an;
        // var toadochung = $(".toadochung").val();
        // var arrtoado = toadochung.split(",")
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          mau_nuoc_nguoi_lay_mau: mau_nuoc_nguoi_lay_mau,
          mau_nuoc_so_chi_tieu: mau_nuoc_so_chi_tieu,
          mau_nuoc_ngay_lay_mau: mau_nuoc_ngay_lay_mau,
          toadochung: oblnglat,
          listimage: arrimage

        }

        geojsonpointob.properties.datalist = data
      } else if (txtarea == "KD") {

        var kenh_dan_ten = $(".kenh_dan_ten").val();
        var kenh_dan_ho_chua = $(".kenh_dan_ho_chua").val();
        var kenh_dan_cap_kenh = $(".kenh_dan_cap_kenh").val();
        var kenh_dan_loai_kenh = $(".kenh_dan_loai_kenh").val();
        var kenh_dan_chieu_dai = $(".kenh_dan_chieu_dai").val();
        var kenh_dan_nam_xay_dung = $(".kenh_dan_nam_xay_dung").val();
        var kenh_dan_pham_vi_tuoi = $(".kenh_dan_pham_vi_tuoi").val();
        namecommon=kenh_dan_ten
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          listimage: arrimage
        }
        geojsonpointob.properties.datalist = data
      } else if (txtarea == "KT") {
        var khu_tuoi_ten = $(".khu_tuoi_ten").val();
        var khu_tuoi_nguon_nuoc = $(".khu_tuoi_nguon_nuoc").val();
        var khu_tuoi_dien_tich_khu_tuoi = $(".khu_tuoi_dien_tich_khu_tuoi").val();
        var khu_tuoi_dien_tich_dat_nong_nghiep = $(".khu_tuoi_dien_tich_dat_nong_nghiep").val();
        var khu_tuoi_dien_tich_dat_cong_nghiep = $(".khu_tuoi_dien_tich_dat_cong_nghiep").val();
        var khu_tuoi_dien_tich_dat_nuoi_trong_thuy_san = $(".khu_tuoi_dien_tich_dat_nuoi_trong_thuy_san").val();
        var khu_tuoi_tong_chieu_dai_kenh_cap_1 = $(".khu_tuoi_tong_chieu_dai_kenh_cap_1").val();
        var khu_tuoi_tong_chieu_dai_kenh_cap_2 = $(".khu_tuoi_tong_chieu_dai_kenh_cap_2").val();
        namecommon=khu_tuoi_ten
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          khu_tuoi_dien_tich_khu_tuoi: khu_tuoi_dien_tich_khu_tuoi,
          khu_tuoi_dien_tich_dat_nong_nghiep: khu_tuoi_dien_tich_dat_nong_nghiep,
          khu_tuoi_dien_tich_dat_cong_nghiep: khu_tuoi_dien_tich_dat_cong_nghiep,
          khu_tuoi_dien_tich_dat_nuoi_trong_thuy_san: khu_tuoi_dien_tich_dat_nuoi_trong_thuy_san,
          khu_tuoi_tong_chieu_dai_kenh_cap_1: khu_tuoi_tong_chieu_dai_kenh_cap_1,
          khu_tuoi_tong_chieu_dai_kenh_cap_2: khu_tuoi_tong_chieu_dai_kenh_cap_2,
          toadochung: oblnglat,
          listimage: arrimage
        }
        geojsonpointob.properties.datalist = data
      } else if (txtarea == "VTSL") {
        var vi_tri_sat_lo_cong_trinh = $(".vi_tri_sat_lo_cong_trinh").val();
        var vi_tri_sat_lo_chieu_dai = $(".vi_tri_sat_lo_chieu_dai").val();
        var vi_tri_sat_lo_chieu_rong = $(".vi_tri_sat_lo_chieu_rong").val();
        var vi_tri_sat_lo_muc_do_nguy_hiem = $(".vi_tri_sat_lo_muc_do_nguy_hiem").val();
        namecommon=vi_tri_sat_lo_cong_trinh
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          vi_tri_sat_lo_chieu_dai: vi_tri_sat_lo_chieu_dai,
          vi_tri_sat_lo_chieu_rong: vi_tri_sat_lo_chieu_rong,
          vi_tri_sat_lo_muc_do_nguy_hiem: vi_tri_sat_lo_muc_do_nguy_hiem,
          toadochung: oblnglat,
          listimage: arrimage

        }

        geojsonpointob.properties.datalist = data
      } else if (txtarea == "HC") {

        var ho_chua_ten_ho = $(".ho_chua_ten_ho").val();
        namecommon=ho_chua_ten_ho
        var ho_chua_cap_cong_trinh = $(".ho_chua_cap_cong_trinh").val();
        var ho_chua_don_vi_thiet_ke = $(".ho_chua_don_vi_thiet_ke").val();
        var ho_chua_don_vi_thi_cong = $(".ho_chua_don_vi_thi_cong").val();
        var ho_chua_don_vi_quan_ly = $(".ho_chua_don_vi_quan_ly").val();
        var ho_chua_nam_xay_dung = $(".ho_chua_nam_xay_dung").val();
        var ho_chua_nam_hoan_thanh = $(".ho_chua_nam_hoan_thanh").val();
        var ho_chua_don_vi_thiet_ke = $(".ho_chua_don_vi_thiet_ke").val();
        var ho_chua_dien_tich_tuoi = $(".ho_chua_dien_tich_tuoi").val();
        var ho_chua_dien_tich_luu_vuc = $(".ho_chua_dien_tich_luu_vuc").val();
        var ho_chua_dien_tich_huu_dung = $(".ho_chua_dien_tich_huu_dung").val();
        var ho_chua_dien_tich_muc_nuoc_dang_binh_thuong = $(".ho_chua_dien_tich_muc_nuoc_dang_binh_thuong").val();
        var ho_chua_muc_nuoc_phong_lu_thiet_ke = $(".ho_chua_muc_nuoc_phong_lu_thiet_ke").val();
        var ho_chua_muc_nuoc_chet = $(".ho_chua_muc_nuoc_chet").val();
        var ho_chua_loai_dap = $(".ho_chua_loai_dap").val();
        var ho_chua_be_rong_dap = $(".ho_chua_be_rong_dap").val();
        var ho_chua_chieu_cao_dap = $(".ho_chua_chieu_cao_dap").val();
        var ho_chua_doc_mai_thuong_luu = $(".ho_chua_doc_mai_thuong_luu").val();
        var ho_chua_doc_mai_ha_luu = $(".ho_chua_doc_mai_ha_luu").val();
        var ho_chua_be_rong_tran = $(".ho_chua_be_rong_tran").val();
        var ho_chua_cao_trinh_nguong_tran = $(".ho_chua_cao_trinh_nguong_tran").val();
        var ho_chua_q_tran = $(".ho_chua_q_tran").val();
        var ho_chua_loai_cong = $(".ho_chua_loai_cong").val();
        var ho_chua_khau_do_cong = $(".ho_chua_khau_do_cong").val();
        var ho_chua_chieu_dai_cong = $(".ho_chua_chieu_dai_cong").val();
        var ho_chua_cao_trinh_nguong_cong = $(".ho_chua_cao_trinh_nguong_cong").val();
        var ho_chua_loai_nha = $(".ho_chua_loai_nha").val();
        var ho_chua_dien_tich = $(".ho_chua_dien_tich").val();
        var ho_chua_chat_lieu = $(".ho_chua_chat_lieu").val();

        var ho_chua_chieu_rong = $(".ho_chua_chieu_rong").val();
        var ho_chua_chieu_dai = $(".ho_chua_chieu_dai").val();
        // var toadochung = $(".toadochung").val();
        // var arrtoado = toadochung.split(",")
        // var oblnglat = {
        //   lng: arrtoado[0],
        //   lat: arrtoado[1]
        // }
        var oblnglat = {
          lng: lngpos,
          lat: latpos
        }
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
          ho_chua_doc_mai_thuong_luu: ho_chua_doc_mai_thuong_luu,
          ho_chua_doc_mai_ha_luu: ho_chua_doc_mai_ha_luu,
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
          listimage: arrimage
        }

        geojsonpointob.properties.datalist = data
      }
      //namecommon là tên của mỗi công trình
      var datasend = {
        event: "insertDataCollected",
        idprovince: $(".cbprovince").val(),
        iddistrict: $(".cbdistrict").val(),
        idward: $(".cbwards").val(),
        address: $(".addresschung").val(),
        namecommon:namecommon,
        iduser: iduser,
        idarea: txtarea,
        data: JSON.stringify(geojsonpointob),
        toadochung: JSON.stringify(oblnglat),
      }
      
      queryData("php/api.php", datasend, function (res) {
        if (res.success == 1) {
          alert_info("Ghi thông tin thành công")
          flag = 0;
          $('.showchoosearea').modal('hide');
        } else {
          alert_info("Ghi thông tin thất bại")
        }
      });
    }
  })
  // //Khi modal ẩn thì hiển thị lại
  $(".content").on('hidden.bs.modal', function (e) {
    if (flag == 0) {

      $('.showchoosearea').modal('hide');
    } else {
      $('.showchoosearea').modal('show')
    }
    //remove marker
  })
  $(".content").on('click', '.btnexit', function (e) {
    //map.removeLayer(marker)

    $('.showchoosearea').modal('hide')
    flag = 0;
  })
  //Remove image when click remove add
  $(".content").on('click', '.click_xoa_image', function (e) {
    var url = $(this).attr("data-url");
    var vt = $(this).attr("data-vt");
    var datasend = {
      event: "deleteImage",

      url: url
    }
    console.log(datasend);

    queryData("php/api.php", datasend, function (res) {
      console.log(res);
      if (res.success == 1) {
        arrimage.splice(vt, 1);
        showLinkImage(arrimage)
      } else {
        alert_info("Xóa Lỗi")
      }

    });
  })
  map.on('pm:cut', function (e) {
    console.log('cut event on map');
    console.log(e);
  });

});
map.on('pm:edit', function (e) {
  console.log('pm:edt event fired. See console for details');
  // alert('pm:remove event fired. See console for details');

});
map.on('pm:remove', function (e) {
  $(".content").on('show.bs.modal', function (e) {
    console.log("show" + e);
    $("#ExtralargeModal").attr("class", "modal fade viewinfor");
  });
  console.log('pm:remove event fired. See console for details');
  // alert('pm:remove event fired. See console for details');
  console.log(e);
  var id = e.layer.feature.properties.id;
  // $(".viewinfor").modal("hide");
  deleteDataAreaID(id, "viewinfor")
});

map.on('pm:drawstart', function (e) {
  console.log(e);
  console.log(e.workingLayer);
});

// const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 });
// const m2 = L.marker([51.50614, -0.0989]);
// const m3 = L.marker([51.50915, -0.096112], { pmIgnore: true });

// const mGroup = L.layerGroup([m1, m2, m3]).addTo(map);
// mGroup.pm.enable();

// map.pm.addControls({
//   drawMarker: true,
//   drawPolygon: true,
//   editMode: false,
//   drawPolyline: false,
//   removalMode: true,
// });
// map.pm.addControls({
//   drawMarker: false,
//   drawPolygon: true,
//   editMode: false,
//   drawPolyline: true,
//   removalMode: false,
// });
map.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  drawCircle: false,
  drawCircleMarker: false,
  drawText: false,
  editMode: true,
  drawPolyline: true,
  removalMode: true
});
// map.pm.addControls({
//   drawMarker: true,
//   drawPolygon: true,
//   editMode: true,
//   drawPolyline: true,
//   removalMode: true,
// });

// map.pm.disableDraw('Polygon');
// map.pm.enableDraw('Circle', {
//     snappable: true,
//     cursorMarker: true
// });

// map.pm.enableDraw('Line', { allowSelfIntersection: false });
// map.pm.enableDraw('Polygon', { allowSelfIntersection: false });

map.on('pm:globaleditmodetoggled', function (e) {
  // console.log(e);
});


// // theCollection.on('pm:dragstart', function (e) {
// //   console.log(e);
// // });

// // const geoJsonButton = document.getElementById('test-geojson');
// // const geoJsonLayer = L.geoJson(null, { pmIgnore: false });
// // geoJsonLayer.addTo(map);
// // geoJsonLayer.addData(geoJsonData);

// // geoJsonLayer.pm.toggleEdit({
// //     draggable: true,
// //     snappable: true,
// // });
function showDataChoose() {
  var datasend = {
    event: "getALLAreaData"
    // event: "getALLAreaData",
    // iduser: iduser
  }

  $(".addDataArea").html("Đang lấy dữ liệu");
  queryData("php/api.php", datasend, function (res) {
    var arr = res.items;
    if (arr.length > 0) {
      var t = '';
      for (item in arr) {
        var it = arr[item];

        t = t + '<option data-namearea="' + it.namearea + '" value="' + it.idarea + '">' + it.namearea + '</option>';

      }
      $(".addDataArea").html(t);

    } else {
      alert_info("Bạn chưa được phân công thu thập dữ liệu");
      $('.showchoosearea').modal('hide');

    }
  })
}
function ketquauploadimagedata(oj) {

  if (oj.status == true) {
    var img = oj.namefie;
    urlimage = img;
    alert_success("Tải File Thành công");
    $(".progresscommon").html("");
    arrimage.push(urlimage)
    showLinkImage(arrimage)
    //$("#imgPreviewMH").attr("src","serverfileupload/"+img);		
  } else {
    $(".progresscommon").html("");
    alert_success("Tải File Không Thành công<br>" + oj.message);
    urlimage = "";
  }
}
function showLinkImage(arr) {
  var t = '';
  for (var i in arr) {
    var im = url + "serverfileupload/" + arr[i];
    t = t + '<tr><td colspan="4"><div class="image">' +
      '<img width="100px" height="100px" src="' + im + '" class="img-circle elevation-2 addvartar" alt="avartar">' +
      '</div></td><td data-vt="' + i + '" data-url="' + arr[i] + '" class="click_xoa_image">&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge bg-danger"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td></tr>';
  }
  $(".showlinkurl").html(t);
}
//menu loc
function showDataAreaFilter() {
  var datasend = {
    event: "getALLAreaData"

  }

  $(".filtermap").html("Đang lấy dữ liệu");
  queryData("php/api.php", datasend, function (res) {
    var arr = res.items;
    if (arr.length > 0) {
      var t = '';
      for (item in arr) {
        var it = arr[item];
        t = t + '<tr>' +
          '<td><input type="checkbox" name="checkAll" class="checkSingle" value="' + it.idarea + '"/></td>' +
          '<td>&nbsp;&nbsp;' + it.namearea + '</td>' +
          '<td>&nbsp;<img src="' + url + "/serverfileupload/" + it.iconarea + '" with="30px" height="30px" /> </td>' +
          '</tr>';
      }

      $(".filtermap").html(t);

    } else {
      alert_info("Lỗi");

    }
  })
}
function showpROVINCE(cbprovince) {
  var datasend = {
    event: "getALLPROVINCE"

  }
  //console.log(datasend);
  queryData("php/api.php", datasend, function (res) {

    var data = res.items; //data=[{},{}]
    if (data.length == 0) {
      $("." + cbprovince).html('<option value="NULL">Chọn tỉnh/TP</option>');
    } else {
      var htmls = '<option value="NULL">Chọn tỉnh/TP</option>';
      for (var item in data) {
        var obj = data[item];
        htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
      }
      $("." + cbprovince).html(htmls);
    }

  });
}
function showDistricts(cbprovince, provinceid) {
  var datasend = {
    event: "getALLDistrictByID",
    code: provinceid

  }
  //console.log(datasend);
  queryData("php/api.php", datasend, function (res) {

    var data = res.items; //data=[{},{}]
    if (data.length == 0) {
      $("." + cbprovince).html('<option value="NULL">Chọn Quận/Huyện</option>');
    } else {
      var htmls = '<option value="NULL">Quận/Huyện</option>';
      for (var item in data) {
        var obj = data[item];
        htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
      }
      $("." + cbprovince).html(htmls);
    }

  });
}
function showWards(cbprovince, districtid) {
  var datasend = {
    event: "getALLWardByID",
    code: districtid

  }
  //console.log(datasend);
  queryData("php/api.php", datasend, function (res) {

    var data = res.items; //data=[{},{}]
    if (data.length == 0) {
      $("." + cbprovince).html('<option value="NULL">Chọn Xã/Phường</option>');
    } else {
      var htmls = '<option value="NULL">Chọn Xã/Phường</option>';
      for (var item in data) {
        var obj = data[item];
        htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
      }
      $("." + cbprovince).html(htmls);
    }

  });
}
