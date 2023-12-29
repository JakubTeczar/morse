class User < ApplicationRecord
  before_create :default_role
  after_create :add_learn_record
  has_many :log
  has_many :learn

  def default_role
    self.role ||= "standard"
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  private

  def add_learn_record
    # data: {views: 0, current_letters: [], mode: "learn" , generated_pool: [], level: 0}
    # current_letters - litery z których tworzona jest pula
    # generated_pool - pula która została wygenerowana
    Learn.create!(user_id: self.id, remind: [], learned: [], inprocess: [], new: custom_pool, data: {views: 0, current_letters: [], mode: "learn" , generated_pool: [], level: 0} )
  end

  def custom_pool
    # w przyszlosic losowanie rozynch puli liter
    [
      {
        letter: "a",
        morse_code: ".-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "b",
        morse_code: "-...",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "c",
        morse_code: "-.-.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "d",
        morse_code: "-..",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "e",
        morse_code: ".",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "f",
        morse_code: "..-.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "g",
        morse_code: "--.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "h",
        morse_code: "....",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "i",
        morse_code: "..",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "j",
        morse_code: ".---",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "k",
        morse_code: "-.-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "l",
        morse_code: ".-..",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "m",
        morse_code: "--",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "n",
        morse_code: "-.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "o",
        morse_code: "---",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "p",
        morse_code: ".--.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "q",
        morse_code: "--.-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "r",
        morse_code: ".-.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "s",
        morse_code: "...",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "t",
        morse_code: "-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "u",
        morse_code: "..-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "v",
        morse_code: "...-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "w",
        morse_code: ".--",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "x",
        morse_code: "-..-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "y",
        morse_code: "-.--" ,
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "z",
        morse_code: "--..",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "1",
        morse_code: ".----",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "2",
        morse_code: "..---",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "3",
        morse_code: "...--",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "4",
        morse_code: "....-",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "5",
        morse_code: ".....",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "6",
        morse_code: "-....",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "7",
        morse_code: "--...",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "8",
        morse_code: "---..",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "9",
        morse_code: "----.",
        history: [] ,
        level: 0,
        view_num: 0
      },
      {
        letter: "0",
        morse_code: "-----",
        history: [] ,
        level: 0,
        view_num: 0
      }
    ]
  end
end
