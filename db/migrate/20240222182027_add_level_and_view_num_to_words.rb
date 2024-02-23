class AddLevelAndViewNumToWords < ActiveRecord::Migration[7.1]
  def change
    add_column :words, :level, :integer
    add_column :words, :view_num, :integer
  end
end
