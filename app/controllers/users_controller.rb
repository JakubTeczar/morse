class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    @users = User.all
  end

  def statistics
    @mode = params[:mode]
    @type = params[:type]
    learn_days = Log.where(user_id: current_user.id).length
    @yes = 0
    @no = 0
    if @mode == "week"
      @log = Log.where(user_id: current_user.id).last(7)
      if @log.length < 7
        dif = 6 - @log.length 
        for i in 0..dif
          @log.unshift(Log.new(user_id: current_user.id, date: (Date.today - (7-i)), yes: 0, no: 0,learned_letters: 0))
        end
      end
    else
      @log = Log.where(user_id: current_user.id).last(31)
      if @log.length < 31
        dif = 30 - @log.length 
        for i in 0..dif
          @log.unshift(Log.new(user_id: current_user.id, date: (Date.today - (30-i)), yes: 0, no: 0,learned_letters: 0))
        end
      end
    end
    @logs_json = @log.to_json
    learn = Learn.find_by(user_id: current_user.id)
    @learned = learn.learned.length
    @inprocess = learn.inprocess.length
    @new = learn.new.length
    @views = learn.data["views"]
    
    @log.each do |record|
      @yes += record.yes
      @no += record.no
    end
    @average = @learned.to_f / learn_days
    @predict = (34 - (@learned.to_f / @average)).ceil
    
  end

  def update_log
    if current_user
      log = Log.find_by(user_id: current_user.id , date: Date.today)
      if log
        learn = Learn.find_by(user_id: current_user.id)
        puts "updatae ==#{learn.data}"
        generate_letter = learn.data["generated_pool"].shift(1)
        current_letters = learn.data["current_letters"]

        letter = current_letters.find { |item| item["letter"] == generate_letter[0]["letter"] }

        learn.data["views"] +=1
        letter["view_num"] = learn.data["views"]
      
        if params[:data] == "yes"
          log.increment!(:yes)
          letter["level"] += 1
        elsif params[:data] == "no"
          log.increment!(:no)
          if letter["level"] != 0
            letter["level"] -= 1
          end
        end

        # co ma się dziać jeśli ostatni tryb to remind albo nauka
        if learn.data["mode_history"][-1] == "remind"

          remind_letter = learn.learned.find { |item| item["letter"] == generate_letter[0]["letter"] }
          remind_letter["level"] = letter["level"]
          remind_letter["view_num"] = learn.data["views"]

          if params[:data] == "no"
            learn.learned.delete_if { |item| item["letter"] == generate_letter[0]["letter"] }
            learn.data["current_letters"].delete_if { |item| item["letter"] == generate_letter[0]["letter"] }

            if remind_letter["level"] > 6
              learn.remind.push(letter)
            else
              learn.inprocess.push(letter)
            end

          end
        else

          inprocess_letter = learn.inprocess.find { |item| item["letter"] == generate_letter[0]["letter"] }
          if letter["level"] > 6
            log.increment!(:learned_letters)
            learn.learned.push(letter)
            learn.inprocess.delete_if { |item| item["letter"] == generate_letter[0]["letter"] }
            learn.data["generated_pool"].delete_if { |item| item["letter"] == generate_letter[0]["letter"] }
            learn.data["current_letters"].delete_if { |item| item["letter"] == generate_letter[0]["letter"] }
          end

          inprocess_letter["level"] = letter["level"]
          inprocess_letter["view_num"] = learn.data["views"]
  
        end

        learn.save
        head :ok
      else
        if params[:data] == "yes"
          Log.create(user_id: current_user.id, date: Date.today, yes: 1, no: 0,learned_letters: 0)          
        elsif params[:data] == "no"
          Log.create(user_id: current_user.id, date: Date.today, yes: 0, no: 1,learned_letters: 0)
        end
        head :ok
      end
    else
      head :not_found
    end
  end
  
end
