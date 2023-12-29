class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    @users = User.all
  end

  def statistics
    @yes = 0
    @no = 0

    log = Log.where(user_id: current_user.id)

    log.each do |record|
      @yes += record.yes
      @no += record.no
    end
  end

  def update_log
    if current_user
      log = Log.find_by(user_id: current_user.id , date: Date.today)
      if log
        learn = Learn.find_by(user_id: current_user.id)
        puts "updatae ==#{learn.data}"
        generate_letter = learn.data["generated_pool"].shift(1)
        current_letters = learn.data["current_letters"]

        puts "letters = #{current_letters}"
        puts "genre = #{generate_letter[0]}"
        letter = current_letters.find { |item| item["letter"] == generate_letter[0]["letter"] }
        puts "letter current = #{letter}"

        if params[:data] == "yes"
          log.increment!(:yes)
          letter["level"] += 1
        elsif params[:data] == "no"
          log.increment!(:no)
          letter["level"] -= 1
        end
        learn.save
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
