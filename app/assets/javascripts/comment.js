$(function() {
    function buildHTML(message){
    var html = `<div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name }
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
        </div>
        <div class="lower-meesage">
            <br>
            <p class="lower-message__content">
              ${message.content}
            </p>
          <img source = "${message.image.url}">
      </div>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('.form__submit').prop("disabled", false);
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      var new_message = $('.messages')[0];
      $(".messages").animate({scrollTop: new_message.scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  });
});
