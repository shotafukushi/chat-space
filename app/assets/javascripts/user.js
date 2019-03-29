$(function() {

  var searchResult = $("#user-search-result")
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                </div>`
    searchResult.append(html)
    console.log(user.name)
  }
  function searchNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    searchResult.append(html);
  }

  var members = $("#chat-group-users")
  function addUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-member'>
                <input name='group[user_ids][]' type='hidden' value=${ id }>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    members.append(html);
  }

  $('#user-search-field.chat-group-form__input').on("keyup", function(){
    var input = $("#user-search-field.chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          searchUser(user)
        });
      } else {
          searchNoUser("ユーザーはいません");
        }
        $(document).on("click", ".user-search-add", function(){
          $(this).parent().remove();
          var user_id = $(this).attr("data-user-id")
          var user_name = $(this).attr("data-user-name")
          addUser( user_id, user_name );
        });

        $(document).on("click", ".user-search-remove", function() {
          $(this).parent().remove();
        });
      })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
  });
});
