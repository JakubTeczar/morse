class WordsController < ApplicationController
  before_action :set_word, only: %i[ show edit update destroy ]

  # GET /words or /words.json
  def index
    @words = Word.all
  end

  def match_letters
    word = Word.all.sample 
    @letters = word.word.split("")
    @codes = word.morse_code.split(" ")
    @mixCodes = [*@codes]
    counter = 0
    
    begin
      letter = Letter.all.sample
      if Letter.all.include?(letter)
        @mixCodes.push(letter.morse_code)
        counter += 1
      end
    end while counter < 2
    @mixCodes = @mixCodes.shuffle

  end

  def match_letters_update
    word = Word.all.sample 
    @letters = word.word.split("")
    @codes = word.morse_code.split(" ")
    @mixCodes = [*@codes]
    counter = 0
    
    begin
      letter = Letter.all.sample
      if Letter.all.include?(letter)
        @mixCodes.push(letter.morse_code)
        counter += 1
      end
    end while counter < 2
    @mixCodes = @mixCodes.shuffle

    respond_to do |format|
      format.turbo_stream
      headers['Turbo-Frame'] = 'match_letters_frame'
      format.turbo_stream { render turbo_stream: turbo_stream.replace('match_letters_frame', partial: 'words/new_letters') }
    end
  end

  # GET /words/1 or /words/1.json
  def show
  end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit
  end

  # POST /words or /words.json
  def create
    @word = Word.new(word_params)

    respond_to do |format|
      if @word.save
        format.html { redirect_to word_url(@word), notice: "Word was successfully created." }
        format.json { render :show, status: :created, location: @word }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /words/1 or /words/1.json
  def update
    respond_to do |format|
      if @word.update(word_params)
        format.html { redirect_to word_url(@word), notice: "Word was successfully updated." }
        format.json { render :show, status: :ok, location: @word }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1 or /words/1.json
  def destroy
    @word.destroy!

    respond_to do |format|
      format.html { redirect_to words_url, notice: "Word was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def word_params
      params.require(:word).permit(:word, :morse_code)
    end
end
