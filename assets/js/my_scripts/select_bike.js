$(document).ready(function(){
    $.ajax({
        url: 'shopping_cart.php',
        method: post,
        data: $('#bike_form').serialize(),
        success:function(){
            alert('success');
            window.location.replace('shopping_cart.php');
        },
        error:function(){
            alert('fail');
        },
    });

    $.getJSON("bike_select_php", function(data){
        $("#img_div").append("<img src='"+ data['img_link'] +"'>");
        $("#rented_bike_details").append(
            "<h3>"+data.bike_name+"</h3>"+
            "<span><b>"+data.bike_model+"</b></span><br>"+
            "<h3><?php echo $bikePrice . ' DA/Jour'; ?></h3><br>"+
            "<span>Enter booking details!</span><br><br>"+
            "<span><b>Choose your date range</b></span><br><br>"
        );
    })
});