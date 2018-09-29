$(function() {
  function buildHTML(message) {
  var insertImage = '';
  if (message.image.url) {
    insertImage = `<img src="${message.image.url}">`;
  }
  var html = `
    <div class="upper-message" data-message-id="${message.id}">
      <div class="upper-message__user-name">
        ${message.name}
      </div>
      <div class="upper-message__date">
        ${message.date}
      </div>
      <div class="lower-message__content">
        ${message.content}
      </div>
      ${insertImage}
    </div>`;
  return html
  }
  setInterval(function(){
  $.ajax({
    url: location.href.json,
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function(json) {
    alert('自動更新に失敗しました');
  });
  } ,5000 );
});

