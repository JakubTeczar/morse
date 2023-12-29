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

    @letter
    puts "learn ==#{learn.data}"
    if current_pool.blank?
      current_pool = create_learn_pool
      learn.data["generated_pool"] = current_pool[0]
      learn.data["current_letters"] = current_pool[1]
      @letter = current_pool[0][0]
    else
    @letter = current_pool[0]
    end

    @mode = params[:mode]
    @reverse = params[:reverse]
    learn.save
  end

  def create_learn_pool
    learn = Learn.find_by(user_id: current_user.id)
    inprocess = learn["inprocess"]
    pool = []
    if inprocess.blank?
      # tutja trzeba bedzie zrobic lepszą logike
      # dodać if który będzie sprawdzała nie tylko tabele inprocess
      # i co jakiś czas dodawanie do powtórki tych liter które już umiałeś
      pool.push(learn.new[0],learn.new[1],learn.new[2])
      newLetters = learn.new.shift(3)
      learn.inprocess.push(*newLetters)
    else
      pool = inprocess
    end
    learn.save
    p = inprocess
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
