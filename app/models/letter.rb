class Letter < ApplicationRecord
	validates :letter, presence: true, length:{maximum:1}
	validates :morse_code, presence: true ,format: { with: /\A[.-]+\z/, message: "Can only contain '-' and '.'" }
end
