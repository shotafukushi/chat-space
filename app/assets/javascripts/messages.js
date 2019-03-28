$(function() {
  //メッセージ表示のHTML生成
  function buildHTML(message){
    img = message.image ? `<img src = "${message.image}" class = "lower-message__image">`:"";

    var html = `<div class="message">
                 <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${ message.user_name}
                  </div>
                  <div class="upper-message__date">
                      ${message.created_at}
                  </div>
                 </div>
                 <div class="lower-message>
                     <p class="lower-message__content">
                       ${ message.content }
                     </p>
                     ${img}
                 </div>
                </div>`;

  console.log(message.user_name);
  console.log(message.created_at);
  console.log(message.content);

  return html;
  }

  //メッセージの非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    console.log(url);


    $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
    })
    .done(function(data) {
      /*data.forEach(function(message){*/
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset()
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('.form__submit').prop('disabled',false);
        $('.form__message').val("");
    })
    .fail(function() {
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
    $('#new_message')[0].reset();
    return false;
  })
});
