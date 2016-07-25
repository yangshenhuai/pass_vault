


/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
           
            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

          
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///
    $(document).ready(function () {
        mainApp.main_fun();

        $('.square-content').hover(function(){
                $(this).children('.mask').removeClass('square_button');
            } , function(){
                $(this).children('.mask').addClass('square_button');
            });

          $('.square_select').click(function(){
                if($(this).hasClass('div-square')) {
                    $(this).removeClass('div-square');
                   $(this).addClass('div-square_selected')
                } else {
                      $(this).removeClass('div-square_selected');
                      $(this).addClass('div-square')
                }

          });





    });

}(jQuery));



