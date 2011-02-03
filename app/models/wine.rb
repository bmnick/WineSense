class Wine < ActiveRecord::Base
  has_many :tastings, :dependent => :destroy
  
  validates_presence_of :year
  validates_presence_of :winery
  validates_presence_of :wine
  
  def to_s
    "#{year} #{winery} #{wine}"
  end
  
  # returns either the fully combined JSON string of all 
  # tastings or nil, if no tastings have been recorded
  def aggregate_tastings
    unless self.tastings.size == 0
      scents = parse_tastings
      aggregate_json = combine_json scents
    end
    
    aggregate_json ||= "{}"
  end
  
  # returns an array of hashes representing each parsed json string
  def parse_tastings
    scents = Array.new
    
    self.tastings.each do |tasting|
      scents << JSON.parse(tasting.json_string)
    end
    
    scents
  end
  
  # returns a combined json string of all hashes
  def combine_json scents
    full_json = scents.inject(Hash.new) do |result, cur|
      result.update(cur) {|key, running, cur| running + cur }
    end
    
    full_json.to_json
  end
end
