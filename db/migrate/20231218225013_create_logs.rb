class CreateLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :logs do |t|
      t.integer :user_id
      t.date :date
      t.integer :yes
      t.integer :no

      t.timestamps
    end
  end
end
