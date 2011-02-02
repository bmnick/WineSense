class AddDescriptionToWines < ActiveRecord::Migration
  def self.up
    add_column :wines, :description, :string
  end

  def self.down
    remove_column :wines, :description
  end
end
