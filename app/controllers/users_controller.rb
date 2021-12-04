class UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
    @user = User.new(user_params)
        if @user.save
            flash[:notice] = "Welcome to Bitcoin Hedge Staking #{@user.name}! You have successfully signed up!"
            redirect_to root_path
        else
            render 'new'
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end
end
