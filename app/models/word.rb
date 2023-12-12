class Word < ApplicationRecord
    before_save :generate_output_text

    def generate_output_text
      self.morse_code = translate_to_morse(self.word)
    end

    def translate_to_morse(text)
        translation = ''
    
        text.downcase.each_char do |char|
          letter = Letter.find_by(letter: char)
          translation << (letter.morse_code + ' ')
        end
    
        self.morse_code = translation.strip
      end
end
