class Tasting < ActiveRecord::Base
  belongs_to :wine
  
  validates_presence_of :json_string
end
