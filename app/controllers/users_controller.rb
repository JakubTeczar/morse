class UsersController < ApplicationController
  def index
    if user_signed_in? && current_user.role == "admin"
      @users = User.all
    else
      @users = []
    end
  end
end
