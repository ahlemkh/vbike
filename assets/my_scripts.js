function submitForm(){
    $(document).ready(function(){
        //signup
        if($('#inputPassword').val() != $('#inputRPassword').val()){
            alert('Passwords do not match!');
            //alert("2");
        }
        else
        {
            alert('passwords match');
            //console.log('passwords match');

            $.ajax({
                url: "signup_process.php",
                method: "post",
                
                data: $('#my_signup_form').serialize(),
                success:function(data){
                    alert('successss!!');
                    window.location.replace("login.php");
                    },
                error: function(){
                    alert('failed!');
                }
            });
        }
    });
}

//LOGIN
//function loginForm(){
$(document).ready(function(){
    //alert('1');
    $('#login_btn').on('click', function(){
        alert('2');
        if($('#loginPassword').val() != $('#loginRPassword').val()){
            alert('Passwords do not match!');
        }
        else
        {
            //alert('passwords match');
            $.ajax({
                url: "login_process.php",
                method: "post",
                data: $('#my_login_form').serialize(),
                success:function(data){
                    //alert("login success!");
                    //alert("data");
                    window.location.replace("choose_bike.php")
                },
                error: function(){
                    alert('failed!');
                }
            });
        }
    });
    
});
//}