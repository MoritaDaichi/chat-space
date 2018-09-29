$(function(){
  var search_list = $(".user-search-result");
  var add_group_userlist = $("#chat-group-users");
  var user_list = []
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
      <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
      <p class='chat-group-user__name'>
        ${user.userName}
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
      url: '/users',
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
    user = $(this)[0].dataset;
    addUsersInGroup(user);
    $(this).parent().remove();
    //user_list.push(user.userId);
  });
  $(document).on("click",".user-search-remove",function(e){
    //user_id = $(this).siblings()[0].defaultValue;
    $(this).parent().remove();
    /*for(i=0; i<user_list.length; i++){
      if(user_list[i] == user){
        user_list.splice(i, 1);
      }
    }*/
  });
});

