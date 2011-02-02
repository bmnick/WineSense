class TastingsController < ApplicationController

  def new
    @wine = Wine.find params[:wine_id]
    @tasting = @wine.tastings.build
  end
  
  def create
    @wine = Wine.find params[:wine_id]
    @tasting = @wine.tastings.build params[:tasting]
    
    if @tasting.save
      flash[:notice] = 'Tasting Created'
      redirect_to @wine
    end
  end

end
