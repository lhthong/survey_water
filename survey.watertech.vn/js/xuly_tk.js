var record=3;
$(document).ready(function () {
    $(".btnfilterarea").click(function () {
        showDataTK(0,record)
    })
    $(".cbprovincefilter").click(function () {
        var provinceid = $(".cbprovincefilter").val();

        showDistricts("cbdistrictfilter", provinceid);
    })
    $(".cbdistrictfilter").click(function () {
        var districtid = $(".cbdistrictfilter").val();

        showWards("cbwardsfilter", districtid);
    })
    
	$(".numberpageareatk").on('click','button',function () {  
		
		showDataTK($(this).val(),record);
	})
});
function showDataTK(page,record){
    var idprovince = $(".cbprovincefilter").val();
        var iddistrict = $(".cbdistrictfilter").val();
        var idward = $(".cbwardsfilter").val();
        var idarea = $(".cbareatk").val();

        var datasend = {
            event: "getDataIsCollectTK",
            page:page,
            record:record,
            idprovince: idprovince,
            iddistrict: iddistrict,
            idward: idward,
            idarea: idarea
        }
        console.log(datasend)
        var html = ''
        $(".addListAREATK").html('<div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>');
        queryData("php/api.php", datasend, function (res) {
            console.log(res)
            var arr = res.features;
            var stt=1;
             var currentpage=parseInt(res.page);
             stt=printSTT(record,currentpage);
            if(arr.length==0){
                $(".addListAREATK").html("<tr><td colspan='6'>Không tìm thấy</td></tr>");
                $(".numberpageareatk").html("");
            }else{
            for (var i in arr) {
                var ad=arr[i].properties.datalist.addresschung+","+arr[i].properties.datalist.namewards+","+arr[i].properties.datalist.namedistrict+","+arr[i].properties.datalist.nameprovince;
                html = html + '<tr>' +
                    '<td style="width: 10px">'+stt+'</td>' +
                    '<td>' + arr[i].properties.datalist.namearea + '</td>' +
                    '<td>' + arr[i].properties.namecommon + '</td>' +
                    '<td>' + ad +'</td>' +
                    '<td>' + arr[i].properties.fullname + '</td>' +
                    '<td>' + arr[i].properties.datetime + '</td>' +
                    '<td>Xem</td>' +
                    '</tr>';
                    stt++;
            }
            $(".addListAREATK").html(html);
            buildSlidePage($(".numberpageareatk"),5,res.page,res.totalpage);
        }
        });

}
function showCBAreaTK(cbarea) {
    var datasend = {
        event: "getALLAreaData"

    }

    $("." + cbarea).html("Đang lấy dữ liệu");
    queryData("php/api.php", datasend, function (res) {
        var arr = res.items;
        if (arr.length > 0) {
            var t = '<option  value="ALL">Tất cả</option>';
            for (item in arr) {
                var it = arr[item];

                t = t + '<option  value="' + it.idarea + '">' + it.namearea + '</option>';

            }
            $("." + cbarea).html(t);

        } else {

        }
    })
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
            $("." + cbprovince).html('<option value="ALL">Tất cả</option>');
        } else {
            var htmls = '<option value="ALL">Tất cả</option>';
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
            $("." + cbprovince).html('<option value="ALL">Tất cả</option>');
        } else {
            var htmls = '<option value="ALL">Tất cả</option>';
            for (var item in data) {
                var obj = data[item];
                htmls = htmls + '<option value="' + obj.code + '">' + obj.full_name + '</option>';
            }
            $("." + cbprovince).html(htmls);
        }

    });
}
