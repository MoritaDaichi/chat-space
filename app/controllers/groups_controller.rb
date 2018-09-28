class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]

  def adduser
    @choose_user = search_user
    respond_to do |format|
      format.html
      format.json
    end
  end

  def deleteuser
    @delete_user = search_user
    respond_to do |format|
      format.html
      format.json
    end
  end

  def index
  end
  def new
    @search_users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
    @group = Group.new
    @group.users << current_user
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
  end
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
  def set_group
    @group = Group.find(params[:id])
  end

  def search_user
    User.find_by(name: params[:user_name])
  end
end
