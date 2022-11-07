var path='sign_up.php'
$('document').ready(function(){

    $(".pwd_confirm").keyup(function()
    {checkPasswordMatch();});
    $('#contact-form').submit(function(event){
        
        event.stopImmediatePropagation();
        event.preventDefault();
        var form_data=$(this).serialize();
        $.ajax({
        url:"sign_up.php",
        method: "post",
        data: $(this).serialize(),
        success:function(data){
          
                
            $("#input_empty").append("<p>"+ data+ "</p>");
          
            
        },
        error: function(){
            alert("Form submission failed!");
        }

    });
   
   });

   $('#btn_signup').click(function(){
    $('#account_box_login').show();
    $('#account_box_signup').hide();
    

   });
   
   $('#btn_login').click(function(){
    $('#account_box_login').hide();
    $('#account_box_signup').show();
    

   });

   $('#login-form').submit(function(event){
    event.stopImmediatePropagation()
    event.preventDefault();
    var form_data=$(this).serialize();
    $.ajax({
    url:"login.php",
    method: "post",
    data: $(this).serialize(),
    success:function(data){

        console.log(data);
        if(data=="email or password is incorrect")
        {
            $("#input_empty").empty();
            $("#input_empty").append("<p>"+ data+ "</p>");

        }
        else{
            $('#login-form').hide();
            $("#input_empty").empty();
            $("#input_empty").append("<p>"+ data+ "</p>");
            $("#orBox").empty();
            $("#orBox").append("<a href='http://localhost/project/vbike/index.html' class='btn btn-primary'>Back to Home</a>");

        }

       
        
      
        
    },
    error: function(){
        alert("Form submission failed!");
    }

});

});
  
    
});

        

    function checkPasswordMatch() {
        var password = $("#password_admin").val();
        var confirmPassword = $("#password_admin_repeat").val();
        if (password != confirmPassword)
            $("#CheckPasswordMatch").html("Passwords does not match!");
        else
            $("#CheckPasswordMatch").html("Passwords match.");
    };
        

        
            
    
       


