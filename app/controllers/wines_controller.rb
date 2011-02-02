class WinesController < ApplicationController  
  before_filter :load_wines, :only => :index
  before_filter :load_wine, :except => :index
  
  def index
  end

  def show
  end

  def new
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
