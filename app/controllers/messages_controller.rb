class MessagesController < ApplicationController
  def index
    @name = current_user.name
    #あとでグループ一覧を代入して全部見る
  end
  def create
  end
end
