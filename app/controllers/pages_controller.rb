class PagesController < ApplicationController
    before_action :require_user, only: [:stake], :raise => false

    def home
      create_stakewallet?
    end
    def stake
        @stake = Stake.new
        @user = User.find(current_user.id)
        @stakes = @user.stakes.paginate(page: params[:page], per_page: 10).order('created_at DESC')
    end
    def stakewithdrawal
      @stake = Stake.find(params[:id])
      @user = User.find(current_user.id)
      if @user.id == @stake.user_id
        @stakewithdrawals = @stake.stakewithdrawal.paginate(page: params[:page], per_page: 10).order('created_at DESC')
      else
        flash[:alert] = "Access to this page is denied!"
        redirect_to stake_path
      end
    end
end
