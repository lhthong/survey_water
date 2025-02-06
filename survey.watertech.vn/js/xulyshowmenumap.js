$(document).ready(function () {
//buildUserDropdown();
buildUserMap();
$(".btn_log_out").click(function(){
      logout();
  });
$(".btnquantri").click(function() {
  location.href="index.html";
});
$(".btn_change_matkhau").click(function() {
  
  $('.showmodalchangematkhau').modal('show');
  
  });
  $(".btn_change_pass").click(function() {
  var txtpassnew=$('.txtpassnew').val();
  var txtpassnewagain=$('.txtpassnewagain').val();
  if(txtpassnew==""||txtpassnewagain=="")
  {
    bootbox.alert("Mật khẩu không được trống");
  }
  else if(txtpassnew!=txtpassnewagain){
    bootbox.alert("Mật khẩu cũ và mới không khớp");
  }else{
     var dataSend={
    event:"updatepass",
    pass:txtpassnew,
    
    username:localStorage.getItem("usernamesurveytlus")
    }
      console.log(dataSend);
    $(".progesschangepass").html("<img src='images/loading.gif' width='5px' height='5px'/>");
  
      queryData("php/api.php",dataSend,function (res) {
        
        if(res["success"]==1){
          
          bootbox.alert("Thay đổi mật khẩu thành công");
          $('.showmodalchangematkhau').modal('hide');
        }else
        {
          bootbox.alert("Thay đổi mật khẩu thất bại");
        }
          
          $(".progesschangepass").html("");
      })
  }
  });
})