$(function(){
  var search_list = $(".user-search-result");
  var add_userlist = $(".chat-group-users");
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
      <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
      <p class='chat-group-user__name'>
        ${user}
      </p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
        削除
      </a>
    </div>`
    add_userlist.append(html);
  }


  $(".chat-group-form__input").on("keyup", function(e) {
    e.preventDefault();
    var input = $(".chat-group-form__input").val();
    console.log("aaa");
     $.ajax({
      type: 'GET',
      url: '/groups/new',
      data: { keyword: input },
      dataType: 'json'
    })
     .done(function(data){
      console.log(data.users);
      users = data.users
      $(".user-search-result").empty();
      if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
        });
      }
      else {
        appendNoProduct("一致する映画はありません");
      }
     })
     .fail(function() {
      alert('error');
    });
  });

  $(document).on("click", ".user-search-add", function(e){
    namehtml = $(this).prev()[0].textContent ;
    console.log(namehtml);

//    $.ajax({
//      type: 'GET',
//      url: '/groups/adduser', //ここでユーザーを追加する処理をしてもらう
//      data: { keyword: input },
//      dataType: 'json'
//    })
//    .done(function(data){
//      addUserButton()
//    });
  });



});

