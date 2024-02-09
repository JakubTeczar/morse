class KeyerController < ApplicationController
    def index
        @letters = Letter.all.select(:letter, :morse_code).to_json
    end
end
