$(function() {
  //メッセージ表示のHTML生成
  function buildHTML(message){
    img = message.image ? `<img src = "${message.image}" class = "lower-message__image">`:"";

    var html = `<div class="message" id="${message.id}">
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
    return html;
  }

  function nullCheck(){
    var check = true;
    var text = $('.form__message').val().trim();
    var image = $('.hidden').val().trim();

    if(text == "" && image == ""){
      check = false;
    }
    return check;
  }

  //メッセージの非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();

    if (nullCheck() == false){
      window.alert("文字を入力してください");
      return false;
    }

    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
     url: url,
     type: "POST",
     data: formData,
     dataType: 'json',
     processData: false,
     contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset()
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      $('.form__submit').prop('disabled',false);
    })

    .fail(function() {
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
    $('#new_message')[0].reset();
    return false;
  })

  //自動更新
  $(function(){
    setInterval(updateMessage, 5000);
  });

  function updateMessage(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message:last').attr('id');
      var href = window.location.href;
      console.log(message_id);
      $.ajax({
        url: href,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(data){
        var insertHtml = '';
        if($.isEmptyObject(data)){
          console.log("rootend")
        }else{
          console.log("elseroot")
          data.forEach(function(message){
            insertHtml = buildHTML(message);
          });
          $('.messages').append(insertHtml).animate({scrollTop:$('.messages')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(update);
    }
  };
});
