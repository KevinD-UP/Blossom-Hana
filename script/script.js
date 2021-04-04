$(document).ready(function()
{
    $(".predefined-article-img").find("img").css("transition", "transform 500ms ease-in-out");

    $(".predefined-article-img").hover(
        // Handler for mouseenter
        function()
        {
            $(this).find("img").css("transform", "scale(1.2)");
        },
        // Handler for mouseleave
        function()
        {
            $(this).find("img").css("transform", "scale(1)");
        }
    );
});

$('.expandHome').mouseover(function() {
    $('.sub-home').css({
        'display': 'block'
    });
});
$('.subnavbtn').mouseover(function() {
    $('.sub-home').css({
        'display': 'none'
    });
});

$('#trapezoid').mouseleave(function() {
    $('#trapezoid').css({
        'margin-top': '-53px'
    });
    $('.sub-home').css({
        'display': 'none'
    });
}).mouseenter(function() {
    $('#trapezoid').css({
        'margin-top': '0px'
    });
});

$('.count_flower').blur(function () {
    price = 0;
    $('.count_flower').each(function() {
        price += Number($(this).val()) * data.find((flower)=> {
            return flower.name === $(this).attr('name')
        }).price
        $("#amount").text(price + "$")
    })
})

let counter = 1;
setInterval(() => {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1
    }
}, 5000)