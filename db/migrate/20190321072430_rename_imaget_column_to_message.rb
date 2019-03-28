class RenameImagetColumnToMessage < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages , :imaget , :image
  end
end
