class Wine < ActiveRecord::Base
  has_many :tastings, :dependent => :destroy
  
  validates_presence_of :year
  validates_presence_of :winery
  validates_presence_of :wine
end
