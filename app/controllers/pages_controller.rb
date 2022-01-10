class PagesController < ApplicationController
    before_action :require_user, only: [:stake], :raise => false

    def index
      create_btchgwallet?
    end
    def stake
        @stake = Stake.new
        @user = User.find(current_user.id)
        @stakes = @user.stakes.paginate(page: params[:page], per_page: 10).order('created_at DESC')
    end
end
