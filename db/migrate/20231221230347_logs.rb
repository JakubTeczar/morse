class Logs < ActiveRecord::Migration[7.1]
  def change
    create_table :logs do |t|
      t.integer :user_id
      t.integer :level
      t.json :remind
      t.json :learned
      t.json :inprocess
      t.json :new
      t.json :data
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end
  end
end
