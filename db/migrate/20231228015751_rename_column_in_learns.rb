class RenameColumnInLearns < ActiveRecord::Migration[7.1]
  def change
    rename_column :learns, :stats, :data
  end
end
