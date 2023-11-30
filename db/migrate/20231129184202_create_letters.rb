class CreateLetters < ActiveRecord::Migration[7.1]
  def change
    create_table :letters do |t|
      t.string :letter
      t.string :morse_code

      t.timestamps
    end
  end
end
