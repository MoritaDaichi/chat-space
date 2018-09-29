$(function(){
  var searchList = $(".user-search-result");
  var addGroupUserlist = $("#chat-group-users");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">
          ${user.name}
        </p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
          追加
        </a>
      </div>`
      searchList.append(html);
    }

  function appendNoUser(message){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${message}
      </p>
      </div>`
      searchList.append(html);
  }

  function addUsersInGroup(user){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
      <p class='chat-group-user__name'>
        ${user.userName}
      </p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
        削除
      </a>
    </div>`
    addGroupUserlist.append(html);
  }


  $(".chat-group-form__input").on("keyup", function(e) {
    e.preventDefault();
    var input = $(".chat-group-form__input").val();
     $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
     .done(function(data){
      users = data.users;
      searchList.empty();
      if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザ名はありません");
      }
     })
     .fail(function() {
      alert('error');
    });
  });

  $(document).on("click", ".user-search-add", function(e){
    user = $(this)[0].dataset;
    addUsersInGroup(user);
    $(this).parent().remove();
  });
  $(document).on("click",".user-search-remove",function(e){
    $(this).parent().remove();
  });
});

