class KeyerController < ApplicationController
  def index
      if user_signed_in?
      

      @letters = Letter.all.select(:letter, :morse_code).to_json
      @level = params[:level]
      learn  = Learn.find_by(user_id: current_user.id)
      
      if @level.to_i > learn.data["level"]
        redirect_to keyer_index_path(level: 'auto')
      end

      selectedLevel = 0

      current_pool = []
      history =  learn.data["mode_history"]
      learn.data["generated_pool"] = []

      if @level == "auto" || @level.to_i == learn.data["level"]
        selectedLevel = learn.data["level"]
        @level = learn.data["level"]
        if learn.data["generated_pool"].present?
        end 
      else
        selectedLevel = @level.to_i
      end

      # sprawdza dwa ostatnio wywołane tryby to nauka czy przypomnienie liter
      if selectedLevel != learn.data["level"]
      
        # last_selcted_word = learn.data["last_index_words"][(selectedLevel-1)]
        words = Word.where(level: selectedLevel)
        # words = Word.where(level: selectedLevel).where.not(word: last_selcted_word)
        current_pool = [[words.sample]]
        learn.data["generated_pool"] = current_pool[0]
        learn.data["current_pool"] = []

        # learn.data["last_index_words"][(selectedLevel-1)] = current_pool[0]
      else
        if current_pool.blank? 
          if learn.data["mode_history"][-2..-1].all? { |el| el == "learn" } && learn.learned.length > 0
            learn.data["mode_history"].push("remind")
            current_pool = create_remind_pool
          else
            if learn.new.length < 1
                learn.data["mode_history"].push("remind")
                current_pool = create_remind_pool
            else

                # if you want to level up to the next level
                if learn.inprocess.length == 0 && learn.new.length < learn.data["level_border"] && learn.data["last_index_words"][@level-1] == -1
                  words = Word.where(level: selectedLevel)
                  current_pool = [[words.sample]]
                  learn.data["generated_pool"] = current_pool[0]
                  learn.data["current_pool"] = []
                else
                  learn.data["mode_history"].push("learn")
                  current_pool = create_learn_pool(learn.data["level"])
                  learn.data["mode_history"] = learn.data["mode_history"].last(3)
                  learn.data["level"] = current_pool[2]
                  @level = current_pool[2]
                  learn.data["array_len"] = current_pool[3]
                end
            end
          end
          puts  "TU SĄ DANE"
          puts learn.data["last_index_words"];
          puts  "KONIEC"
          learn.data["generated_pool"] = current_pool[0]
          learn.data["current_letters"] = current_pool[1]
          
          @letter = current_pool[0]
        else
          @letter = current_pool[0]
        end
      end
      learn.save
      @cur = learn.data["current_letters"]
      @learned = learn.learned
      @gen = learn.data["generated_pool"]
      @generated_pool = learn.data["generated_pool"].to_json
      @hist = learn.data["mode_history"]
      @un_lock= [*learn.learned].to_json
      @array_len = current_pool[0].length
      @max_level = learn.data["level"]
      puts learn.data["generated_pool"]
      else
        redirect_to "/home/index"
      end
  end 

  def create_remind_pool
      learn = Learn.find_by(user_id: current_user.id)
      learned = learn.learned
      pool = []
      learned.sort_by! { |obj| obj["view_num"] }
  
      if learned.length > 6
        pool.push(learned[0..5])
      else
        pool = learned
      end
      learn.save
  
      return [pool,pool]
    end


    def create_learn_pool(userLevel)
      
      learn = Learn.find_by(user_id: current_user.id)
      inprocess = learn["inprocess"]
      pool = [] 
      level = userLevel
      # how_many_add = -(inprocess.length) + 5
      # level 1 => 2
      # level 2-7 => 4
      # level 8-9 => 5
      how_many_add = userLevel == 1 ? 2 : userLevel > 7 ? 5 : 4

      if inprocess.length < 1
        newLetters = learn.new.shift(how_many_add)
        pool.push(*newLetters)
        learn.inprocess.push(*newLetters)
      else
        pool = inprocess
      end
  
      learn.save
      p = inprocess
      p = p.sort_by! { |obj| obj["level"] }
      tab = []
      
      (0...inprocess.length).each do |i|
        tab.push(p[i],p[i])
      end

      tab.shuffle!

      return [tab,pool,level,tab.length]
    end
end