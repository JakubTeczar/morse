class CreateLearns < ActiveRecord::Migration[7.1]
  def change
    create_table :learns do |t|
      t.integer :user_id
      t.integer :level
      t.json :remind
      t.json :learned
      t.json :inprocess
      t.json :new
      t.json :stat

      t.timestamps
    end
  end
end
