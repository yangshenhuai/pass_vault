
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
                    $('#action_button').show()
                    if( 1 == $('.div-square_selected').size()) {
                        $('#change_password_action_button').show()
                    } else {
                         $('#change_password_action_button').hide()
                    }
                } else {
                      $(this).removeClass('div-square_selected');
                      $(this).addClass('div-square')

                      if(0 == $('.div-square_selected').size()) {
                            $('#action_button').hide()
                      }
                      if( 1 == $('.div-square_selected').size()) {
                        $('#change_password_action_button').show()
                    } else {
                         $('#change_password_action_button').hide()
                    }

                }
          });

          var clipboard = new Clipboard('#copy_password_btn');
          clipboard.on('error', function(e) {
                console.error(e);
            });

    });

}(jQuery));


function showPasswordItem(pwd_id){
    $.ajax('/password/'+pwd_id , {
        dataType:'json',
        success:function(data){
            $('#password_item_title').text(data.websiteName)
            $('#item_account').val(data.userName).prop('readonly', true);
            $('#item_password').val(data.password).prop('readonly', true);
            $('#go_to_site_btn').attr('site_url', data.websiteLoginUrl);
            $('#go_to_site_btn').show()
            $('#save_pwd_btn').hide()
            $('#copy_password_btn').show()
            $('#generate_password_btn').hide()
            $('#show_detail_dialog').modal()
        }
    });
}


function goToSite() {
    url = $('#go_to_site_btn').attr('site_url')
    window.open(url, '_blank')
}

function showChangePasswordModal(){
    var selected_count = $('.div-square_selected').size()
    if(selected_count == 1) {
        var id = $('.div-square_selected:first').attr('password-id')
        $.ajax('/password/'+id , {
        dataType:'json',
        success:function(data){
            $('#password_item_title').text(data.websiteName)
            $('#item_account').val(data.userName).prop('readonly', true);
            $('#item_password').val(data.password).prop('readonly', false);
            $('#go_to_site_btn').hide()
            $('#save_pwd_btn').show()
            $('#copy_password_btn').hide()
            $('#generate_password_btn').show()
            $('#go_to_site_btn').attr('site_url', data.websiteLoginUrl);
            $('#show_detail_dialog').modal()
        }
    });
    }
}
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '!@#$_';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}
function show_generate_password() {
    var generatedPwd = randomString(12,'#Aa!')
    $('#item_password').val(generatedPwd)
}


