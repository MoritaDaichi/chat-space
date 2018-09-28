$(function(){
  var search_list = $(".user-search-result");
  var add_group_userlist = $("#chat-group-users");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${user.name}
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
      追加
      </a>
      </div>`
      search_list.append(html);
    }

  function appendNoUser(message){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${message}
      </p>
      </div>`
      search_list.append(html);
  }

  function addUsersInGroup(user){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${user.id}'>
      <p class='chat-group-user__name'>
        ${user.name}
      </p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
        削除
      </a>
    </div>`
    add_group_userlist.append(html);
  }


  $(".chat-group-form__input").on("keyup", function(e) {
    e.preventDefault();
    var input = $(".chat-group-form__input").val();
     $.ajax({
      type: 'GET',
      url: '/groups/new',
      data: { keyword: input },
      dataType: 'json'
    })
     .done(function(data){
      users = data.users;
      search_list.empty();
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
    user = $(this).prev()[0];
    console.log(user.innerText);
    $.ajax({
      type: 'GET',
      url: '/groups/adduser', //ここでユーザーを追加する処理をしてもらう
      data: { user_name: user.innerText},
      dataType: 'json'
    })
    .done(function(data){
      addUsersInGroup(data.choose_user);
      $(user).parent().remove();
    })
    .fail(function() {
      alert('error');
    });
  });


  $(document).on("click",".user-search-remove",function(e){
    user = $(this).prev()[0] ;
    $.ajax({
      type: 'DELETE',
      url: '/groups/deleteuser', //ここでユーザーを削除する処理をしてもらう
      data: { user_delete:user.innerText},
      dataType: 'json'
    })
    .done(function(data){
      $(user).parent().remove();
    })
    .fail(function() {
      alert('error');
    });
  })
});

