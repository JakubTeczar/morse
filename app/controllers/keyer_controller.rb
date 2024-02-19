class KeyerController < ApplicationController
    def index
        @letters = Letter.all.select(:letter, :morse_code).to_json

        learn  = Learn.find_by(user_id: current_user.id)
        current_pool = learn.data["generated_pool"]
        history =  learn.data["mode_history"]
        @letter
    
        # sprawdza dwa ostatnio wywołane tryby to nauka czy przypomnienie liter
        if current_pool.blank?
          if learn.data["mode_history"][-2..-1].all? { |el| el == "learn" } && learn.new.length > 0
            learn.data["mode_history"].push("remind")
            current_pool = create_remind_pool
          else
            if learn.new.length < 0
                learn.data["mode_history"].push("remind")
                current_pool = create_remind_pool
            else
                learn.data["mode_history"].push("learn")
                current_pool = create_learn_pool
                learn.data["mode_history"] = learn.data["mode_history"].last(3)
            end
          end
          learn.data["generated_pool"] = current_pool[0]
          learn.data["current_letters"] = current_pool[1]
          @letter = current_pool[0][0]
        else
        @letter = current_pool[0]
        end
        # @level = learn.data["current_letters"].find { |letter| letter["letter"] == @letter["letter"] }&.fetch("level", nil)
        learn.save
        #@current = learn.data["current_letters"].find { |item| item["letter"] == @letter["letter"] }
        @cur = learn.data["current_letters"]
        @learned = learn.learned
        @gen = learn.data["generated_pool"]
        @generated_pool = learn.data["generated_pool"].to_json
        @hist = learn.data["mode_history"]
        @level = (8 - (learn.new.length / 4).ceil);
        learn.data["level"] = @level 
       
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
    
      def create_learn_pool
        learn = Learn.find_by(user_id: current_user.id)
        inprocess = learn["inprocess"]
        pool = []
    
        if inprocess.length < 3
          how_many_add = -(inprocess.length) + 5
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
        tab.push(p[0],p[0],p[0],p[1],p[1],p[1],p[2],p[2],p[2],p[2]).shuffle!
        return [tab,pool]
      end
end
