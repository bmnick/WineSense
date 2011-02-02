class CreateTastings < ActiveRecord::Migration
  def self.up
    create_table :tastings do |t|
      t.string :json_sting
      t.belongs_to :wine

      t.timestamps
    end
  end

  def self.down
    drop_table :tastings
  end
end
