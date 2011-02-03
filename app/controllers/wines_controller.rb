class WinesController < ApplicationController  
  before_filter :load_wines, :only => :index
  before_filter :load_wine, :except => [:index, :new, :create]
  
  def index
  end

  def show
  end

  def new
    @wine = Wine.new
  end
  
  def create
    @wine = Wine.new(params[:wine])
    @wine.description = nil if @wine.description == ""
    
    if @wine.save
      flash[:notice] = 'Wine Created'
      redirect_to :action => "index", 
    end
  end

  def edit
  end
  
  def load_wines
    @wines = Wine.all
  end
  
  def load_wine
    @wine = Wine.find(params[:id])
  end

end
