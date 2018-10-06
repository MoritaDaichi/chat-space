class UsersController < ApplicationController

  def index
    search_users_id = User.where('name LIKE(?)', "%#{params[:keyword]}%").ids
    search_users_id.delete(current_user.id)
    @search_users = []
    search_users_id.each do |id|
      @search_users << User.find(id)
    end

    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
