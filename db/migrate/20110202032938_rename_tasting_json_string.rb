class RenameTastingJsonString < ActiveRecord::Migration
  def self.up
    rename_column :tastings, :json_sting, :json_string
  end

  def self.down
    rename_column :tastings, :json_string, :json_sting
  end
end
