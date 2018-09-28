$(function(){
  var search_list = $(".user-search-result");
  var add_group_userlist = $("#chat-group-users");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${user.name}
      </p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">
      追加
      </a>
      </div>`
      search_list.append(html);
    }

  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
        ${user}
      </p>
      </div>`
      search_list.append(html);
  }

  function addUsersGroup(user){
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
    user_name = $(this).prev()[0].innerText ;
    console.log(user_name);
    $.ajax({
      type: 'GET',
      url: '/groups/adduser', //ここでユーザーを追加する処理をしてもらう
      data: { user_name: user_name},
      dataType: 'json'
    })
    .done(function(data){
      console.log(data);
      addUsersGroup(data.choose_user);
    });
  });



});

