json.user_name          @message.user.name
json.content            @message.content
json.created_at         @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id                 @message.id
json.image              @message.image.url
json.content_present    @message.content.present?
json.content            @message.content
json.image_present      @message.image.present?
json.image              @message.image.url
