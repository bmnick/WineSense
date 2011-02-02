class Wine < ActiveRecord::Base
  validates_presence_of :year
  validates_presence_of :winery
  validates_presence_of :wine
end
