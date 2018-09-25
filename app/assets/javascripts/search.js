$(function(){
  var search_list = $(".user-search-result");
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
});

