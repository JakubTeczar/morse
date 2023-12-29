class AddLearndedLettersToLogs < ActiveRecord::Migration[7.1]
  def change
    add_column :logs, :learned_letters, :integer
  end
end
