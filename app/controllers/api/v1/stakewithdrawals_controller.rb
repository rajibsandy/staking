module Api
  module V1
    class StakewithdrawalsController < ApplicationController
      def stakewithdrawals
        @stake = Stake.find(params[:id])
        if @stake.user_id == current_user.id
          @stakewithdrawals = @stake.stakewithdrawals
          render json: {stake: @stake, main: @stakewithdrawals}
        else
          render json: {stake: nil, main: nil}
        end
      end
    end
  end
end
