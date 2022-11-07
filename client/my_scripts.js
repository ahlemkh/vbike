function submitForm(){
    $(document).ready(function(){

        if($('#inputPassword').val() != $('#inputRPassword').val()){
            alert('Passwords do not match!');
            alert("2");
        }
        else
        {
            //alert('passwords match');
            console.log('passwords match');

            $.ajax({
                url: "signup_process.php",
                method: "post",
                data: $('#my_signup_form').serialize(),
                success:function(){
                    alert('successss!!');
                    window.location.replace("login.html")
                    },
                error: function(){
                    alert('failed!');
                }
            });
        }
        });
}

$(document).ready(function(){
$('#my_login_form').on('submit', function(){
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
            //alert(data);
            },
        error: function(){
            alert('failed!');
        }
    });
    }
});

});