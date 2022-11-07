const urlbase='http://localhost/project/vbike/table_bike.html';
$('document').ready(function(){
    checkConnection();
    $("#logout").click(function(){
        logout();

    });
    profile();
    $("#admin_repeat_password").keyup(function()
    {checkPasswordMatch();});
    $("#admin_password").keyup(function()
    {checkPasswordMatch();});
    
    $('#personal_form').submit(function(event){
        event.stopImmediatePropagation();
        event.preventDefault();
        if(checkPasswordMatch()){
            var form_data=$(this).serialize();
            console.log("hhh");
            console.log(form_data);
        $.ajax({
            url:"edit_profile.php",
            method: "post",
            data: $(this).serialize(),
            success:function(data){
                alert(data);
                checkConnection();

        
            },
            error: function(){
                alert("Error, please try again!");
            }

});


        }


})
})
function checkPasswordMatch() {
        var password = $("#admin_password").val();
    var confirmPassword = $("#admin_repeat_password").val();
    if (password != confirmPassword)
        {$(".help-block").html("<span style='color:red'>Passwords does not match!</span>");
        return false;}
    else
        {
            $(".help-block").html("<span style='color:green'>Passwords match.</span>");
            return true;
        }
   
    
};
function profile(){
    $.getJSON( "profile.php", function( data ) {
        $('#welcome_div').append("<strong>"+data.admin_full_name+" !</strong>");
        $('#profile_information h2').prepend(data.admin_full_name);
        $('#profile_information dl').append("<dt>Admin Id</dt><dd>"+data.admin_id+"</dd>");
        $('#profile_information dl').append("<dt>Full Name</dt><dd>"+data.admin_full_name+"</dd>");
        $('#profile_information dl').append("<dt>Email</dt><dd>"+data.admin_email+"</dd>");
        
           
        });
}

function logout(){
    $.ajax({
        url:"logout.php",
        method: "post",
        success:function(data){
            if(data=="logout")
            {
                checkConnection();
                
            }
            else{
                alert("Error Try again!");
            }
          
            
        },
        error: function(){
            alert("Error Try again!");
        }

    });
};
function checkConnection(){
        $.ajax({
        url:"check_connection.php",
        method: "post",
        success:function(data){
            if(data=="not connected")
            {
                alert("not connected");
                window.location.replace("http://localhost/project/vbike/sign_up.html");
                
            }
            else{
                $("#admin_con li a:eq(0)").html('<img alt="" class="admin-pic img-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXE2EnvtncW3k1h3k6U40vIXvskkGQxg7WPw&usqp=CAU">Hi, '+data+' <b class="caret"></b>');
                $("#admin_con").show();
            }
          
            
        },
        error: function(){
            alert("Error Try again!");
        }

    });


};