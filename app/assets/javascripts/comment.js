$(function() {
    function buildHTML(message){
    var html = `<div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user.name }
        </div>
        <div class="upper-message__date">
          ${format_posted_time(message.created_at)}
        </div>
        </div>
        <div class="lower-meesage">
          if message.content.present?
            <br>
            <p class="lower-message__content">
              ${message.content}
            </p>
          ${image_tag message.image.url if message.image.present? }
      </div>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    console.log("you did submit");
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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
    })
    .fail(function(){
      alert('error');
    })
  });
});
