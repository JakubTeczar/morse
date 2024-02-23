class CreateWords < ActiveRecord::Migration[7.1]
  def change
    create_table :words do |t|
      t.string :word
      t.string :morse_code
      t.integer :level
      t.integer :view_num

      t.timestamps
    end
  end
end
