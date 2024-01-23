class UsersController < ApplicationController
  load_and_authorize_resource

  def export_to_pdf
    statistics
    
    require 'base64'
    require 'stringio'
    image_data = params[:image_data]
    theImage = StringIO.new(Base64.decode64(image_data.split(',', 2).last))

    logs = @log
    formatted_logs = JSON.pretty_generate(@logs_json)
    learned = JSON.pretty_generate(@learned)
    inprocess = JSON.pretty_generate(@inprocess)
    newLen = JSON.pretty_generate(@new)
    views = JSON.pretty_generate(@views)
    average = JSON.pretty_generate(@average)
    predict = JSON.pretty_generate(@predict)

    export_date = Date.today.strftime("%Y-%m-%d")

    @pdf = Prawn::Document.new do
      pdf_height = 792
      font_families.update(
        'OpenSans' => {
          normal: Rails.root.join('app/assets/fonts/OpenSans-Regular.ttf'),
          bold: Rails.root.join('app/assets/fonts/OpenSans-Bold.ttf'), # Added comma here
          light: Rails.root.join('app/assets/fonts/OpenSans-Light.ttf')
        }
      )
      # stroke_horizontal_rule
  
      # header
      svg IO.read("app/assets/images/header.svg"), at: [-40 , bounds.height + 30], position: :center, width: 620
      text export_date, align: :right, size: 12, leading: 6, style: :ligh, color: "0000FF"
      move_down 10

      text "Overall progress", size: 20
      # text "Learned :"+ learned
      # text "Inprocess :"+inprocess
      # text "New :"+newLen
      # text "Views :"+views
      # text "Average :"+average
      # text "Predict :"+predict
      
      table_data = [
        [
          {content: "Learned:#{learned}\n\nInprocess:#{inprocess}\n\nNew:#{newLen}\n\nViews:#{views}\n\nAverage:#{average}\n\nPredict:#{predict}",
          size: 12,
          valign: :center,},
          {image: theImage,image_width: 450}
        ]
      ]

      # Utwórz tabelę i dostosuj jej styl
      table(table_data, position: :center, column_widths: [80, 450]) do
        cells.style(border_color: "FFFFFF")  # Ustawienie koloru obramowania na biały (FFFFFF)
      end
      move_down 10
   
      content = []
      text "History:", style: :bold, size: 22
      logs.reverse.each do |item|
        # content.push([" Date: #{item[:date]}"+" Yes: #{item[:yes]}"+" No: #{item[:no]}"+" Learned Letters: #{item[:learned_letters]}"]);
        text "Date: #{item[:date]}", style: :bold
        text "Yes: #{item[:yes]} No:#{item[:no]} Learned Letters: #{item[:learned_letters]}"
        stroke_horizontal_rule
        move_down 10
      end
      data = [ content.reverse ]
      move_down 20
    end

    pdf_data = Base64.encode64(@pdf.render)
    filename = "Statistics_#{@export_date}.pdf"
  
    render json: { pdf_data: pdf_data, filename: filename }
  
  end

  
  def test_PDF
    statistics
    image_data = params[:image_data]

    #PNG nie dziala
    # image_data_io = StringIO.new(Base64.decode64(image_data))
    # image_path = "app/assets/images/u8d12iks.png" 

    #działające PNG
    require 'base64'
    require 'stringio'
    theImage = StringIO.new(Base64.decode64(image_data.split(',', 2).last))
    puts image_data.split(',', 2).last

    #Próba zmiany PNG na JPG
    # require "mini_magick"
    # imageG = MiniMagick::Image.open(image_data_io)
    # imageG.format "png"

    #SVG
    # svg_data = params[:image_data]
    # puts svg_data

    @pdf = Prawn::Document.new do
      svg IO.read("app/assets/images/header.svg"), at: [-40 , bounds.height + 30], position: :center, width: 620

      #SVG
      # svg StringIO.new(svg_data), width: 500, color: :rgb, fill: '#f3f3f3'
      #czarnobiałe zdjęcie
      # image.write "output.png"
      #Nawet pobrany SVG nie działa 
      # svg IO.read("app/assets/images/c1x2z1ih.svg"), position: :center, width: 620

      #PNG
      # require 'base64'
      image theImage, width: 500
      # image image_data, width: 200
      #Prawn::Errors::UnsupportedImageType (image file is an unrecognised format)
      #PNG pobrany działa
      # image image_path, width: 200
    end
  
    pdf_data = Base64.encode64(@pdf.render)
    filename = "Statistics_.pdf"

    # send_data(@pdf.render,
    #   filename: "Statistics_#{@export_date}.pdf",
    #   type: 'application/pdf',
    #   disposition: 'inline')
  
    render json: { pdf_data: pdf_data, filename: filename }
  end

  # def statistics_pdf

  # end

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
