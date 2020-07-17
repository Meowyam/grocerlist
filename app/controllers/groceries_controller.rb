class GroceriesController < ApplicationController
  def index
    groceries = Grocery.order("created_at DESC")
    render json: groceries
  end

  def create
    grocery = Grocery.create(grocery_param)
    render json: grocery
  end

  def update
    grocery = Grocery.find(params[:id])
    grocery.update_attributes(grocery_param)
    render json: grocery
  end

  def destroy
    grocery = Grocery.find(params[:id])
    grocery.destroy
    head :no_content, status: :ok
  end

  private
    def grocery_param
      params.require(:grocery).permit(:title, :done)
    end
end
