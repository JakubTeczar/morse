
class RenameStatColumnToDataInLearns < ActiveRecord::Migration[7.1]
  def change
    rename_column :learns, :stat, :data
  end
end
