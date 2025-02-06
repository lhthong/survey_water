var arrfeatureSave;
$(document).ready(function () {
	 
	$(".chooselayermapsearch").click(function(){
		var lay= $(".chooselayermapsearch").val();
		 if(lay=="osmLayer")
		  $('.leaflet-control-layers-selector')[0].click();
		 else if(lay=="topoLayer"){
		  $('.leaflet-control-layers-selector')[1].click();
		 }
	  })
	showDataAreaFilterSearch();
	$(".btnremovemap").click(function(){
		$(".txtsearch").val("");
		$(".resultsearch").html("");
		$(".numberresult").html("0");
		map.setView([15.45350814059372, 106.27856084455142], 6);
	})
	$(".resultsearch").on('click', '.click_xem_map', function () {
		var vt=parseInt($(this).attr("data-vt"));
		var id=$(this).attr("data-id");
		var lat=$(this).attr("data-lat");
		var lng=$(this).attr("data-lng");
		console.log(lat+""+lng)
		map.setView([lat,lng], 8);
		// console.log(vt+""+id)
		// console.log(arrfeatureSave[vt].geometry.coordinates[0][0])
		for (; Object.keys(map._layers).length > 1;) {
			map.removeLayer(map._layers[Object.keys(map._layers)[1]]);

		}
		var lay= $(".chooselayermapsearch").val();
		 if(lay=="osmLayer")
		  $('.leaflet-control-layers-selector')[0].click();
		 else if(lay=="topoLayer"){
		  $('.leaflet-control-layers-selector')[1].click();
		 }
		var res={
			type:"FeatureCollection",
			features:[arrfeatureSave[vt]]
		}
		console.log(res)
		//var res=JSON.stringify(ob)
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
					} else if (layer.pm._shape == "Line") {
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
			} else if (e.layer.pm._shape == "Line") {

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
		theCollection.addTo(map);
	});
	$(".btnseachmap").click(function () {
		latold = 0;
		latnew = 0;
		lngold = 0;
		lngnew = 0;
		for (; Object.keys(map._layers).length > 1;) {
			map.removeLayer(map._layers[Object.keys(map._layers)[1]]);

		}

		var lay= $(".chooselayermapsearch").val();
		 if(lay=="osmLayer")
		  $('.leaflet-control-layers-selector')[0].click();
		 else if(lay=="topoLayer"){
		  $('.leaflet-control-layers-selector')[1].click();
		 }
		var selected = new Array();
		$(".checkSingleS").each(function () {
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
			event: "getDataIsCollectSearch",
			// idprovince: idprovince,
			// iddistrict: iddistrict,
			// idward: idward,
			listarea: s,
			search: $(".txtsearch").val()
		}
		//console.log(datasend)
		$(".resultsearch").html('<div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>');
		queryData("php/api.php", datasend, function (res) {

			console.log(res)
			//console.log(res.features)
			var arrfeature = res.features
			arrfeatureSave=arrfeature
			$(".numberresult").html(arrfeature.length);
			if (arrfeature.length == 0) {
				var t='<tr><td>Không tìm thấy</td><td></tr>';
				$(".resultsearch").html(t);
			} else {
				var h = ''
				for (var i in arrfeature) {
					h = h + '<tr><td >'  + arrfeature[i].properties.namecommon + '</td><td><span data-vt="'+i+'" data-id="'+arrfeature[i].properties.id+'" data-lat="'+arrfeature[i].properties.toadopoint.lat+'" data-lng="'+arrfeature[i].properties.toadopoint.lng+'" class="badge bg-danger click_xem_map">Xem</span><td></tr>';
				}
				$(".resultsearch").html(h);

			}
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
						} else if (layer.pm._shape == "Line") {
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
				} else if (e.layer.pm._shape == "Line") {

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
	
	$("#checkedAllS").change(function () {
		if (this.checked) {

			$(".checkSingleS").each(function () {
				//console.log("check"
				this.checked = true;
			})
		} else {

			$(".checkSingleS").each(function () {
				this.checked = false;
			})
		}
	});

	$(".searchmap").on('click', '.checkSingleS', function () {
		var isAllChecked = 0;

		if ($(this).is(":checked")) {

			$(".checkSingleS").each(function () {
				if (!this.checked)
					isAllChecked = 1;
			})
			if (isAllChecked == 0) {

				$("#checkedAllS").prop("checked", true);
			}
		} else {

			$("#checkedAllS").prop("checked", false);
		}
	});
});
function showDataAreaFilterSearch() {
	var datasend = {
		event: "getALLAreaData"

	}

	$(".searchmap").html("Đang lấy dữ liệu");
	queryData("php/api.php", datasend, function (res) {
		var arr = res.items;
		if (arr.length > 0) {
			var t = '';
			for (item in arr) {
				var it = arr[item];
				t = t + '<tr>' +
					'<td><input type="checkbox" name="checkAll" class="checkSingleS" value="' + it.idarea + '"/></td>' +
					'<td>&nbsp;&nbsp;' + it.namearea + '</td>' +
					'<td>&nbsp;<img src="' + url + "/serverfileupload/" + it.iconarea + '" with="30px" height="30px" /> </td>' +
					'</tr>';
			}

			$(".searchmap").html(t);

		} else {
			alert_info("Lỗi");

		}
	})
}
