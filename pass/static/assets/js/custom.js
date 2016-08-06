
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
            $('#selected_password_id').val(data.eid)
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

function updatePasswordItem() {
    var new_pwd = $('#item_password').val()
    var pwd_id = $('#selected_password_id').val()

    if(new_pwd == '') {
        $('#message_banner').text('Password is Required')
        $('#message_banner').removeClass().addClass('alert').addClass('alert-warning')
    }

    $.ajax('/password/update' ,{
          method:'POST',
          dataType:'json',
          data : {'pwd_id':pwd_id,'new_pwd':new_pwd} ,
          success:function(data){
               $('#show_detail_dialog').modal('hide')
                if(data.status == 'success') {
                     $('#message_banner').text('Save Password Successfully')
                     $('#message_banner').removeClass().addClass('alert').addClass('alert-success')
                } else {
                     $('#message_banner').text(data.message)
                     $('#message_banner').removeClass().addClass('alert').addClass('alert-warning')
                }

          }
    });
}

function removeSelectedItem() {
    var selected_ids = '' ;
    $('.div-square_selected').each(function(i,selected_div){
        var id = $(this).attr('password-id')
        selected_ids += id
        selected_ids += ','
    })
    if(selected_ids == '') {
        $('#message_banner').text('Please select item first')
        $('#message_banner').removeClass().addClass('alert').addClass('alert-warning')
        $('#confirm_dialog').modal('hide')
    }
    selected_ids = selected_ids.substring(0,selected_ids.length -1)
     $.ajax('/password/remove' ,{
        method:'POST',
        dataType:'json',
        data:{'selected_ids' : selected_ids},
        success : function(data) {
            if(data.status == 'success') {
                  $('#message_banner').text('Deleted Successfully')
                  $('#message_banner').removeClass().addClass('alert').addClass('alert-success')
                  id_arr = selected_ids.split(',')
                  for (var i in id_arr){
                     $('#squre_' + id_arr[i]).remove()
                  }
            }
            if(data.status == 'fail') {
                   $('#message_banner').text(data.message)
                  $('#message_banner').removeClass().addClass('alert').addClass('alert-warning')
            }
            $('#confirm_dialog').modal('hide')
        }

     });
}


function showNotesDetails(id) {
    $('#group_item_' + id  + ' > .list-group-item-text').toggle(300);
    $('.list-group-item').removeClass('active');
     $('#group_item_' + id ).addClass('active');
}

function saveNewNotes() {
        var title = $('#security_note_title').val()
        var detail = $('#security_note_detail').val()

        $.ajax('/securityNotes/new',{
            method:'POST' ,
            data:{'title':title,'detail':detail},
            dataType:'json',
            success:function(resp){
                if(resp.status=='success') {
                    $('#message_banner').html('saved successfully')
                    var $a = $("<a>", {href: 'javascript:void(0)', class: 'list-group-item',onclick:'showNotesDetails(' + resp.id + ')'  ,id:'group_item_' + resp.id })
                    var $h4 = $('<h4>',{class:'list-group-item-heading'})
                    $h4.html(title)
                    var $p = $('<p>',{class:'list-group-item-text' , style:'display:none'})
                    $p.html(detail)
                    $a.append($h4).append($p)
                    $('#security_notes_list').prepend($a)
                     $('#new_security_note_dialog').modal('hide')
                }

            }

        })



}



