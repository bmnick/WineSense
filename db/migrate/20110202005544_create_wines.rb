class CreateWines < ActiveRecord::Migration
  def self.up
    create_table :wines do |t|
      t.string :year
      t.string :winery
      t.string :wine

      t.timestamps
    end
  end

  def self.down
    drop_table :wines
  end
end
