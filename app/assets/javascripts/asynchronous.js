$(function() {
  var $messageList = $('.messages');
  function buildHTML(message) {
  if (message.image) {
    insertImage = `<img src="${message.image}">`;
  }
  var html = `<div class="upper-message" data-message-id="${message.id}">
        <div class="upper-message__user-name">
          ${message.name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
        <div class="lower-message__content">
          ${message.body}
        </div>
          ${insertImage}
      </div>`;
  $messageList.append(html);
}

 var interval = setInterval(function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href ,
      type: 'GET' ,
      dataType: 'json'
    })
    .done(function(data) {
      data.messages.forEach(function(message,i) {
        buildHTML(message);
      });
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
  }} , 5000 );
});

