class StakesController < ApplicationController
    def create
        params[:stake][:user_id] = current_user.id
        params[:stake][:at_rate] = 125
        params[:stake][:usd] = params[:stake][:amount].to_i * 125
        params[:stake][:status] = 1
        params[:stake][:withdrawal] = 0
        @stake = Stake.new(stake_params)
        if @stake.save
            flash[:notice] = "Coin successfully staked!"
            redirect_to stake_path
        else
            flash[:alert] = "Something went wrong"
            render 'new'
        end
    end
    def release

    end

    private
    def stake_params
        params.require(:stake).permit(:user_id, :amount, :at_rate, :usd, :status, :withdrawal)
    end
end
