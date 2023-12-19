class UsersController < ApplicationController
  load_and_authorize_resource
  def index
    @users = User.all
  end

  def statistics
    log = Log.find_by(user_id: current_user.id)
    @yes = log.yes
    @no = log.no
  end

  def update_log
    if current_user
      log = Log.find_by(user_id: current_user.id)
      if log
        if params[:data] == "yes"
          log.increment!(:yes)
        elsif params[:data] == "no"
          log.increment!(:no)
        end
        head :ok
      else
        if params[:data] == "yes"
          Log.create(user_id: current_user.id, date: Date.today, yes: 1, no: 0)
        elsif params[:data] == "no"
          Log.create(user_id: current_user.id, date: Date.today, yes: 0, no: 1)
        end
        head :ok
      end
    else
      head :not_found
    end
  end
  
end
