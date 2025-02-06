

// $.ajax({
//     url: 'php/get_polygon.php',
//     dataType: 'json',
//     success: function (response) {
//         var usedColors = []; // Mảng lưu trữ các màu đã được sử dụng
//         for (var i = 0; i < response.length; i++) {
//             var coordinates = response[i].coordinates.split(';');
//             var latlngs = [];
//             for (var j = 0; j < coordinates.length; j++) {
//                 var latlng = coordinates[j].split(',');
//                 latlngs.push([parseFloat(latlng[0]), parseFloat(latlng[1])]);
//             }
//             var color = randomColor(); // Sinh màu ngẫu nhiên từ dải màu RGB
//             while (usedColors.includes(color)) { // Kiểm tra màu mới có trùng với màu đã sử dụng không
//                 color = randomColor();
//             }
//             usedColors.push(color); // Lưu màu mới vào mảng đã sử dụng
//             L.polygon(latlngs, { color: color }).addTo(map); // Sử dụng màu mới cho polygon
//         }
//     },
//     error: function (xhr, status, error) {
//         console.log('Error: ' + error.message);
//     }
// });


// $.ajax({
//     url: 'php/get_polylines.php',
//     dataType: 'json',
//     success: function (response) {
//         var usedColors = []; // Mảng lưu trữ các màu đã được sử dụng
//         for (var i = 0; i < response.length; i++) {
//             var coordinates = response[i].coordinates.split(';');
//             var latlngs = [];
//             for (var j = 0; j < coordinates.length; j++) {
//                 var latlng = coordinates[j].split(',');
//                 latlngs.push([parseFloat(latlng[0]), parseFloat(latlng[1])]);
//             }
//             var color = randomColor(); // Sinh màu ngẫu nhiên từ dải màu RGB
//             while (usedColors.includes(color)) { // Kiểm tra màu mới có trùng với màu đã sử dụng không
//                 color = randomColor();
//             }
//             usedColors.push(color); // Lưu màu mới vào mảng đã sử dụng
//             L.polyline(latlngs, { color: color }).addTo(map); // Sử dụng màu mới cho đường polyline
//         }
//     },
//     error: function (xhr, status, error) {
//         console.log('Error: ' + error.message);
//     }
// });


// $.ajax({
//     url: 'php/get_markers.php',

//     dataType: 'json',
//     success: function (response) {
//         data = response;
//         for (var i = 0; i < data.length; i++) {
//             var marker = L.marker([data[i].lat, data[i].lng], { IDreal: data[i].id }).addTo(markersLayer);
//             var popupContent0 = '<div><h3>Name: ' + data[i].name + '</h3>' +
//                 '<p>Desc: ' + data[i].description + '</p>' +
//                 '<button class="add-image" data-marker-id="' + i + '" style="display:show;">Add Image</button>' +
//                 '<button class="add-data" data-marker-id="' + i + '" style="display:show;">Add Data</button>' +
//                 '<button class="show-data" data-marker-id="' + i + '" style="display:show;">Show Data</button>';
//             marker.bindPopup(popupContent0);

//             // Thêm tùy chọn cho thẻ select
//             $('#marker-select').append($('<option>', {
//                 value: i,
//                 text: data[i].name
//             }));

//         }
//     }
// });

function randomColor() {
    // Sinh ngẫu nhiên màu sắc từ dải màu RGB
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


  
var map = L.map('map').setView([10.792785, 106.706482], 8); // tạo bản đồ

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //tạo layer tile từ openstreetmap
    attribution: '&copy; OpenStreetMap contributors'
});
var topoLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { //tạo layer tile từ google vệ tinh
    maxZoom: 35,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

//thay đổi layer hiển thị
var baseMaps = {
    'Bản Đồ Leaflet': osmLayer,
    'Bản Đồ Vệ Tinh': topoLayer
};

L.control.layers(baseMaps).addTo(map);

var markersLayer = L.layerGroup().addTo(map); // thêm layer cho các đánh dấu

// Tạo icon marker
var markerIcon = L.icon({
    iconUrl: 'icon/i1.png',
    iconSize: [38, 38], // kích thước của biểu tượng
    iconAnchor: [19, 38], // tọa độ anchor của biểu tượng
    popupAnchor: [0, -30] // tọa độ popup của biểu tượng
});
var marker;
// Lấy vị trí của mình
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        // Hiển thị bản đồ tại vị trí của mình
         map.setView([lat, lng], 20);

        // // Thêm marker tại vị trí của mình
        // marker = L.marker([lat, lng], { icon: markerIcon }).addTo(markersLayer);
        // marker.bindPopup('Your location');
        marker = new L.Marker([lat, lng],{ icon: markerIcon }, {draggable:true});
        map.addLayer(marker);
        marker.bindPopup("<b>Bạn đang ở đây.").openPopup();
    });
}  
$(document).ready(function () {

// Tạo nút thêm marker
var addMarkerButton = L.easyButton({
    position: 'topright',
    states: [{
        stateName: 'add-marker',
        icon: 'fa-map-marker',
        title: 'Thêm marker',
        onClick: function (control) {

            // Hiển thị thông báo để hướng dẫn người dùng thêm marker
           // alert('Click vào bản đồ để thêm marker.');
            addMarkerButton.button.style.backgroundColor = 'red';

            // Thêm sự kiện click vào bản đồ để thêm marker
            map.on('click', function (e) {

                // Lấy tọa độ của điểm click
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;

                // Tạo form nhập thông tin
                var formHtml = `
                            <form>
                            <div class="form-group">
                            <label for="nameInput">Name:</label>
                            <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
                            </div>
                            <div class="form-group">
                            <label for="descriptionInput">Description:</label>
                            <textarea class="form-control" id="descriptionInput" placeholder="Enter a description"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                        
                            `;

                // Hiển thị form nhập thông tin bằng prompt của Leaflet
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(formHtml)
                    .openOn(map);

                // Bắt đầu lắng nghe sự kiện submit của form
                var form = document.querySelector('form');
                form.addEventListener('submit', function (event) {
                    // event.preventDefault(); // Ngăn chặn việc submit form

                    // Lấy giá trị từ các input trong form
                    var name = document.querySelector('#nameInput').value;
                    var description = document.querySelector('#descriptionInput').value;

                    // Nếu tên và mô tả được nhập đầy đủ
                    if (name && description) {
                        // Gửi dữ liệu lên server bằng AJAX
                        $.ajax({
                            url: 'php/add_marker.php',
                            type: 'POST',
                            data: {
                                name: name,
                                description: description,
                                lat: lat,
                                lng: lng
                            },
                            success: function (data) {
                                // Thêm điểm đánh dấu vào bản đồ
                                var marker = L.marker([lat, lng]).addTo(markersLayer);
                                marker.bindPopup('Name: ' + name + '<br>' + 'Desc: ' + description);
                                // Thêm tùy chọn cho thẻ select
                                $('#marker-select').append($('<option>', {
                                    value: data.length,
                                    text: name
                                }));

                                // Đóng popup
                                marker.closePopup();
                                map.closePopup();

                                // Hiển thị thông báo thành công
                                alert('Marker added successfully!');

                                // Tải lại trang để hiển thị điểm đánh dấu mới
                                location.reload();
                            },

                            error: function (xhr, status, error) {
                                // Hiển thị thông báo lỗi
                                alert('Error getting markers!');
                            }
                        });
                    }
                });
            });
            // Thay đổi trạng thái của nút
            control.state('stop-marker');
        }
    },
    {
        stateName: 'stop-marker',
        icon: 'fa-marker',
        title: 'Hủy',
        onClick: function (control) {
            addMarkerButton.button.style.backgroundColor = 'white';
            // Hủy thêm Marker
            map.off('click');
            // Thay đổi trạng thái của nút
            control.state('add-marker');
        }
    }]
});

// Thêm button addMarkerButton vào bản đồ
addMarkerButton.addTo(map);
var ViewButton = L.easyButton({
    position: 'topleft',
    states: [{
        stateName: 'View',
        icon:'fa-eye',
       
        title: 'Xem các lĩnh vực đã khảo sát',
        onClick: function (btn, map) {
            $('.showchoosearea').modal('show'); 
        }
    }]
});

// Thêm button vào bản đồ
ViewButton.addTo(map);
var locationButton = L.easyButton({
    position: 'topright',
    states: [{
        stateName: 'location',
        icon: 'fa-location-crosshairs',
        title: 'Quay lại vị trí hiện tại',
        onClick: function (btn, map) {
            if (navigator.geolocation) {
                map.removeLayer(marker)
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                console.log(lat+""+lng)
                // Di chuyển bản đồ đến vị trí hiện tại của người dùng
                map.setView([lat, lng], 20);
            //      // Thêm marker tại vị trí của mình
            // var marker = L.marker([lat, lng], { icon: markerIcon }).addTo(markersLayer);
            // marker.bindPopup('Bạn đang đứng đây');
            marker = new L.Marker([lat, lng],{ icon: markerIcon }, {draggable:true});
            map.addLayer(marker);
            marker.bindPopup("<b>Bạn đang ở đây.").openPopup();
            
            });
        }else {
            alert("Geolocation is not supported by this browser.");
            //set_markers(new google.maps.LatLngBounds(), map);
        }
        }
    }]
});
// Thêm button vào bản đồ
locationButton.addTo(map);

    // Thêm sự kiện click cho nút "Add Image"
    $(document).on('click', '.add-image', function () {
        var markerId = $(this).data('marker-id');

        var marker = markersLayer.getLayers()[markerId];

        var idReal = marker.options.IDreal;


        var popupContent1 = '<form class="image-upload-popup" style="padding:10px;">' +
            '<input type="file" name="image" id="image" />' +
            '<button type="submit" class="submit-image-popup" data-marker-id="' + markerId + '">Submit</button>' +
            '</form>';

        var popup1 = L.popup({ offset: [0, -40] })
            .setLatLng(marker.getLatLng())
            .setContent(popupContent1);
        var group = L.featureGroup([popup1]);

        // Open both popups
        group.addTo(map);
        popup1.openPopup();

        // Handle submit image form
        var imageUploaded = false; // Biến tạm để kiểm tra xem ảnh đã được tải lên chưa

        $(document).off('click', '.submit-image-popup').on('click', '.submit-image-popup', function (e) {
            e.preventDefault();
            var idReal = marker.options.IDreal;
            var markerId = idReal;
            console.log("Marker ID:", markerId);
            var markerImg = $('#image')[0].files[0];

            // Send AJAX request to server to upload image
            var formData = new FormData();
            formData.append('marker_id', markerId);
            formData.append('image', markerImg);

            $.ajax({
                url: 'php/upload_image.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (!imageUploaded) { // Nếu chưa có ảnh nào được tải lên thành công
                        // alert('Image uploaded successfully!');
                        // imageUploaded = true; // Đặt giá trị biến tạm thành true để không hiển thị thông báo lặp lại
                        if (confirm('Image uploaded successfully! Do you want reset page?')) {
                            imageUploaded = true;
                            location.reload(); // Reset lại form
                        }

                    }
                },
                error: function (xhr, status, error) {
                    alert('Error uploading image: ' + error);
                }
            });

            // Close popups
            setTimeout(function () { group.remove(); }, 1000);
        });
    });
    // Thêm sự kiện click cho nút "Add Data"
    $(document).on('click', '.add-data', function () {
        var markerId = $(this).data('marker-id');
        var marker = markersLayer.getLayers()[markerId];
        var idReal = marker.options.IDreal;

        var popupContent2 = '<form class="data-popup" style="padding:10px;" width: 1000px;><table>';

        for (var i = 1; i <= 10; i++) {
            popupContent2 += '<tr>';
            popupContent2 += '<td><label for="data' + i + '">Thuộc tính ' + i + ':</label></td>';
            popupContent2 += '<td><input type="text" class="form-control" name="data' + i + '" id="data' + i + '" placeholder="Nhập thuộc tính ' + i + '" /></td>';
            if (i % 2 == 0) {
                popupContent2 += '</tr><tr>';
            }
        }

        popupContent2 += '</table><button type="submit" class="btn btn-primary submit-data-popup" data-marker-id="${markerId}">Submit';


        var popup2 = L.popup({ offset: [0, -40] })
            .setLatLng(marker.getLatLng())
            .setContent(popupContent2);
        var group = L.featureGroup([popup2]);

        // Open both popups
        group.addTo(map);
        popup2.openPopup();


        var imageData = false; // Biến tạm để kiểm tra xem ảnh đã được tải lên chưa
        // Handle submit data form
        $(document).off('click', '.submit-data-popup').on('click', '.submit-data-popup', function (e) {
            // $(document).on('click', '.submit-data-popup', function (e) {
            e.preventDefault();
            var idReal = marker.options.IDreal;
            var markerId = idReal;

            // Create a FormData object and append each attribute to it
            var formData = new FormData();
            for (var i = 1; i <= 10; i++) {
                var attribute = $('#data' + i).val();
                formData.append('data' + i, attribute);
                console.log('Data: ', i, ": ", attribute);
            }
            formData.append('marker_id', markerId);

            // Send the form data to the server using an AJAX request
            $.ajax({
                url: 'php/upload_data.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,

                success: function (data) {
                    if (!imageData) { // Nếu chưa có ảnh nào được tải lên thành công

                        if (confirm('Data uploaded successfully! Do you want reset page?')) {
                            imageData = true;
                            location.reload(); // Reset lại form
                        }

                    }
                },
                error: function (xhr, status, error) {
                    alert('Error uploading data: ' + error);
                }

            });

            // Close popups
            setTimeout(function () { group.remove(); }, 1000);
        });
    });
    //thêm sự kiện click show data
    $(document).on('click', '.show-data', function () {
        // Lấy ID của marker từ thuộc tính data-marker-id
        var markerId = $(this).data('marker-id');
        var marker = markersLayer.getLayers()[markerId];

        // Lấy thông tin của marker từ mảng data
        var markerInfo = data[markerId];

        // Tạo nội dung popup cho hình ảnh
        var imagePopupContent = '<div class= "image-popup-content">';
        if (markerInfo.image) {
            // Tạo đường dẫn tới hình ảnh trên website
            var imageUrl = 'php/' + markerInfo.image;
            imagePopupContent += '<img class="show-image" src="' + imageUrl + '" style="max-width: 100%;" />';
        }
        imagePopupContent += '</div>';

        $(document).on('click', '.show-image', function () {
            var imageUrl = $(this).attr('src');
            $.fancybox.open({
                src: imageUrl,
                type: 'image'
            });
        });
        // Tạo nội dung popup cho thông tin chung của điểm
        var generalPopupContent = '<div  ><h3>Name: ' + markerInfo.name + '</h3>' +
            '<p>Desc: ' + markerInfo.description + '</p>';

        // Thêm các thuộc tính của marker vào popup
        for (var i = 1; i <= 10; i++) {
            var thuocTinh = markerInfo['thuoc_tinh_' + i];
            if (thuocTinh) {
                generalPopupContent += '<p>Thuộc tính ' + i + ': ' + thuocTinh + '</p>';
            }
        }
        // generalPopupContent += '</div>';

        // // Hiển thị popup

        // Lấy kích thước của popup và generalPopup
        var popupWidth = document.querySelector('.leaflet-popup-content').clientWidth;
        var popupHeight = document.querySelector('.leaflet-popup-content').clientHeight;
        var generalPopupWidth = document.querySelector('.leaflet-popup-content').clientWidth;
        var generalPopupHeight = document.querySelector('.leaflet-popup-content').clientHeight;

        // Tính toán vị trí hiển thị của popup và generalPopup
        var popupPosition = L.point(marker._popup._container.clientWidth, 0);
        var generalPopupPosition = L.point(-generalPopupWidth, 0);

        // Tính toán xOffset và yOffset
        var xOffset = popupPosition.x + popupWidth / 2 - generalPopupPosition.x - generalPopupWidth / 2 - 980;
        var yOffset = generalPopupHeight / 2 - popupHeight / 2;

        var imagePopup = L.popup({
            offset: [xOffset, yOffset]
        })
            .setLatLng([markerInfo.lat, markerInfo.lng])
            .setContent(imagePopupContent)
            .openOn(map);

        var generalPopup = L.popup()
            .setLatLng([markerInfo.lat, markerInfo.lng])
            .setContent(generalPopupContent);

        // Bổ sung các lớp popup vào bản đồ
        imagePopup.addTo(map);
        generalPopup.addTo(map);

    });

});
// Bắt sự kiện khi người dùng chọn marker từ thẻ select
$('#marker-select').on('change', function () {
    // Lấy thông tin về marker được chọn
    var markerID = $(this).val();
    var marker = markersLayer.getLayers()[markerID];

    // Hiển thị popup của marker
    marker.openPopup();
});

// Hiển thị menu các điểm đã đánh dấu khi click vào button
$('#marker-menu-btn').on('click', function () {
    $('#marker-select').toggle();
});

// Di chuyển map đến vị trí của điểm khi người dùng chọn option
$('#marker-select').on('change', function () {
    var selectedMarkerIndex = this.value;
    var selectedMarker = markersLayer.getLayers()[selectedMarkerIndex];
    map.setView(selectedMarker.getLatLng(), 20);
});



// Khởi tạo control vẽ đường
var drawControl = new L.Control.Draw({
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: 'yellow'
            },
            icon: new L.DivIcon({
                className: 'custom-icon',
                html: '<i class="fas fa-road"></i>', // đường dẫn tới file ảnh của icon
                iconSize: [30, 30],
            })
        },
        // Bỏ qua các lựa chọn khác
        marker: false,
        // vẽ hình tròn
        circle: false,
        // vẽ đa giác
        rectangle: {
            shapeOptions: {
                color: 'orange',
                fillColor: 'purple'
            }
        },
        //vẽ polygon
        polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
                color: 'red',
                fillColor: 'blue'
            }
        },
        circlemarker: false
    },
    edit: false // Không cho phép chỉnh sửa đường đã vẽ
});

// Thêm control vào bản đồ
map.addControl(drawControl);

// Thêm sự kiện khi người dùng vẽ đường
map.on('draw:created', function (e) {
    // Lấy đối tượng đường vừa được vẽ
    var layer = e.layer;
    var type = e.layerType;
    if (type === 'polyline') {
        // Hiển thị popup để nhập thông tin đường
        var formHtml = `
        <form>
        <div class="form-group">
        <label for="nameInput">Name:</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
        </div>
        <div class="form-group">
        <label for="descriptionInput">Description:</label>
        <textarea class="form-control" id="descriptionInput" placeholder="Enter a description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
        `;
        L.popup()
            .setLatLng(layer.getLatLngs()[0])
            .setContent(formHtml)
            .openOn(map);

        // Bắt đầu lắng nghe sự kiện submit của form
        var form = document.querySelector('form');
        form.addEventListener('submit', function (event) {
            //event.preventDefault(); // Ngăn chặn việc submit form
            console.log(layer.getLatLngs());
            // Lấy giá trị từ các input trong form
            var name = document.querySelector('#nameInput').value;
            var description = document.querySelector('#descriptionInput').value;

            // Nếu tên được nhập đầy đủ
            if (name) {
                // Gửi dữ liệu lên server bằng AJAX
                $.ajax({
                    url: 'php/add_polyline.php',
                    type: 'POST',
                    data: {
                        name: name,
                        description: description,
                        latlngs: JSON.stringify(layer.getLatLngs())

                    },
                    success: function (response) {
                        alert('Thêm đường thành công!');
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                    }
                });
            }

            // Đóng popup
            map.closePopup();
        });
        map.addLayer(layer);
    }
    if (type === 'polygon' || type === 'rectangle') {
        // Hiển thị popup để nhập thông tin đa giác

        var formHtml = `
    <form>
    <div class="form-group">
    <label for="nameInput">Name:</label>
    <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
    </div>
    <div class="form-group">
    <label for="descriptionInput">Description:</label>
    <textarea class="form-control" id="descriptionInput" placeholder="Enter a description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
    `;

        L.popup()
            .setLatLng(layer.getBounds().getCenter())
            .setContent(formHtml)
            .openOn(map);

        // Bắt đầu lắng nghe sự kiện submit của form
        var form = document.querySelector('form');
        form.addEventListener('submit', function (event) {
            console.log(layer.getLatLngs()[0]);
            //event.preventDefault(); // Ngăn chặn việc submit form

            // Lấy giá trị từ các input trong form
            var name = document.querySelector('#nameInput').value;
            var description = document.querySelector('#descriptionInput').value;

            // Nếu tên được nhập đầy đủ
            if (name) {
                // Gửi dữ liệu lên server bằng AJAX
                $.ajax({
                    url: 'php/add_polygon.php',
                    type: 'POST',
                    data: {
                        name: name,
                        description: description,
                        latlngs: JSON.stringify(layer.getLatLngs()[0])
                    },
                    success: function (response) {
                        alert('Thêm đa giác thành công!');
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                    }
                });
            }

            // Đóng popup
            map.closePopup();
        });
        map.addLayer(layer);
    }

});
