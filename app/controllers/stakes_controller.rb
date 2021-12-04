class StakesController < ApplicationController
    def create
        params[:stake][:user_id] = current_user.id
        params[:stake][:at_rate] = 125
        params[:stake][:usd] = params[:stake][:amount].to_f * 125
        params[:stake][:status] = 1
        params[:stake][:withdrawal] = 0

        if params[:stake][:amount].to_f >= 1
          if params[:stake][:amount].to_i <= stake_balance
            @stakewallet = Stakewallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:stake][:amount], :detail => "Debited_for_staking")
            @stakewallet.save
            @stake = Stake.new(stake_params)
            if @stake.save
                flash[:notice] = "Coin successfully staked!"
                redirect_to stake_path
            else
                flash[:alert] = "Something went wrong"
                redirect_to stake_path
            end
          else
            flash[:alert] = "Amount should be less than your staking balance"
            redirect_to stake_path
          end
        else
          flash[:alert] = "Amount should greater than or equal to 1"
          redirect_to stake_path
        end
    end
    def release

    end

    private
    def stake_params
        params.require(:stake).permit(:user_id, :amount, :at_rate, :usd, :status, :withdrawal)
    end
end
