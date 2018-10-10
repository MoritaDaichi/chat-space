$(function() {
  var $messageList = $('.messages.message');
  setTimeout(interval, 5000);
  function buildHTML(message) {
  var insertImage = '';
  if(message.image != null){
    insertImage = `<img src="${message.image.url}">`;
  }
  var html = `<div class="message">
        <div class="upper-message" data-message-id="${message.id}">
          <div class="upper-message__user-name">
            ${message.name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
          <div class="lower-meesage">
            <br>
            <div class="lower-message__content">
              ${message.body}
            </div>
            ${insertImage}
          </div>
        </div>
      </div>`;
  $messageList.append(html);
}

  function interval(){
  console.log("非同期");
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href ,
      type: 'GET' ,
      dataType: 'json'
    })
    .done(function(data) {
      console.log(data);
      $messageList.html("");
      data.messages.forEach(function(message,i) {
        buildHTML(message);
      });
      setTimeout(interval, 5000);
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
    }
  }
});

