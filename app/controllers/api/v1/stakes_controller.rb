module Api
    module V1
      class StakesController < ApplicationController
            before_action :require_user, only: [:index, :create], :raise => false
        def index
            data = serializer(stakes)
            render json: {main: data, pages: stakes.total_pages}
        end
        def create
            params[:stake][:user_id] = current_user.id
            params[:stake][:at_rate] = current_hedge_rate
            params[:stake][:usd] = params[:stake][:amount].to_f * current_hedge_rate
            params[:stake][:status] = 1
            params[:stake][:withdrawal] = 0

            if params[:stake][:amount].to_f >= 1

              if params[:stake][:amount].to_i <= btchg_balance
                btchgwallet = Btchgwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:stake][:amount], :detail => "Debited_for_staking")
                btchgwallet.save

                stake = Stake.new(stake_params)
                if stake.save
                  render json: serializer(stake)
                else
                  render json: { error: stake.errors.messages }, status: 422
                end
              else
                render json: { status: 'error', message: "Amount should be less than your staking balance" }, status: :unprocessable_entity
              end
            else
              render json: { status: 'error', message: "Amount should greater than or equal to 1 BTCHG" }, status: :unprocessable_entity
            end
        end

        private
        def stake_params
            params.require(:stake).permit(:user_id, :amount, :at_rate, :usd, :status, :withdrawal)
        end

        def stakes
          @user = User.find(current_user.id)
          @stakes ||= @user.stakes.paginate(page: params[:page], per_page: 10).order('created_at DESC')
        end

        def serializer(records)
          StakeSerializer
            .new(records)
            .as_json
        end
        # def options
        #   # @options ||= {include: %i[stakes]}
        # end
      end
    end
end
