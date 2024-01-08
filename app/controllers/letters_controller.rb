class LettersController < ApplicationController
  before_action :set_letter, only: %i[ show edit update destroy ]

  # GET /letters or /letters.json
  def index
    @letters = Letter.all
  end

  # GET /letters/1 or /letters/1.json
  def show
  end

  def learn
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
      learn.data["mode_history"].push("learn")
      current_pool = create_learn_pool
      learn.data["mode_history"] = learn.data["mode_history"].last(3)
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
    @hist = learn.data["mode_history"]

    # if @current["level"] < 3
    #   @mode = "text"
    #   @reverse = false
    # else
    @mode = "text"
    @reverse = "false"
    # end 

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

  def free_learn
    @letter = Letter.order("RANDOM()").first
    @mode = params[:mode]
    @reverse = params[:reverse]
  
    Rails.logger.debug("Received mode: #{@mode}")
    Rails.logger.debug("Received reverse: #{@reverse}")
  end

  # GET /letters/new
  def new
    @letter = Letter.new
  end

  # GET /letters/1/edit
  def edit
  end

  # POST /letters or /letters.json
  def create
    @letter = Letter.new(letter_params)

    respond_to do |format|
      if @letter.save
        format.html { redirect_to letter_url(@letter), notice: "Letter was successfully created." }
        format.json { render :show, status: :created, location: @letter }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @letter.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /letters/1 or /letters/1.json
  def update
    respond_to do |format|
      if @letter.update(letter_params)
        format.html { redirect_to letter_url(@letter), notice: "Letter was successfully updated." }
        format.json { render :show, status: :ok, location: @letter }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @letter.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /letters/1 or /letters/1.json
  def destroy
    @letter.destroy!

    respond_to do |format|
      format.html { redirect_to letters_url, notice: "Letter was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_letter
      @letter = Letter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def letter_params
      params.require(:letter).permit(:letter, :morse_code)
    end
end
