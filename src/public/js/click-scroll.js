//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5];
let isPost = window.location.pathname.substring(0,18) == "/post/post-listing"?true:false;
console.log(window.location.pathname.substring(0,18));


$.each(sectionArray, function(index, value){
    $(document).scroll(function(){
        if(window.location.pathname == "/"){
        var offsetSection = $('#' + 'section_' + value).offset().top - 94;
        var docScroll = $(document).scrollTop();
        var docScroll1 = docScroll + 1;
        
            if ( docScroll1 >= offsetSection ){
                $('.navbar-nav .nav-item .nav-link').removeClass('active');
                $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
                $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
                $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
            }
        }
         
     });
    if(window.location.pathname == '/'){
        $('.click-scroll').eq(index).click(function(e){
            var offsetClick = $('#' + 'section_' + value).offset().top - 94;
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':offsetClick
            }, 300)
        });
    }else{
        $('.click-scroll').eq(index).click(function(e){
            var offsetClick = $('/#' + 'section_' + value).offset().top - 94;
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':offsetClick
            }, 300)
        });
    }
    
});


if(isPost){
        document.querySelector('.tin-tuc').classList.add('active');
    }else{

        $(document).ready(function(){
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
            $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
            $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
        });
    }