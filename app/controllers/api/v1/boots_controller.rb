module Api
  module V1
    class BootsController < ApplicationController
          before_action :require_user, only: [:index, :activate, :boot_plan, :profits, :boot_on, :boot_off, :check_boot_dek], :raise => false
      def index
        data = serializer(profits)
        render json: {main: data, pages: profits.total_pages}
      end

      def activate
      bootplan = Bootplan.find(params[:activate][:option].to_i)
        if bootplan.amount.to_f <= usd_balance
        @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => bootplan.amount.to_f, :detail => "Debited_for_boot_activation")
          if @usdwallet.save
            @user = User.find(current_user.id)
            current = Time.now.utc
            @user.update(boot_active: true, boot_subscription: current, boot_plan: params[:activate][:option].to_i)
          else
              render json: { status: 'error', message: "Something went wrong!" }, status: :unprocessable_entity
          end
        else
          render json: { status: 'error', message: "Not enough balance to activate bot!" }, status: :unprocessable_entity
        end
      end

      def boot_plans
        plans = Bootplan.all
        render json: { plans: plans }
      end

      def profits
        @user = User.find(current_user.id)
        @profits ||= @user.bootprofits.paginate(page: params[:page], per_page: 10).order('created_at DESC')
      end

      def boot_on
        boot_dek = Boot.find_by(user_id: current_user.id)
        if boot_dek == nil
          @feesdata = Fee.find(2)
          fees = @feesdata.percent.to_f / 100
          params[:boot][:user_id] = current_user.id
          params[:boot][:fees] = params[:boot][:usd].to_f * fees
          params[:boot][:amount] = params[:boot][:usd].to_f / params[:boot][:btcrate].to_f
          params[:boot][:open] = true
          if usd_balance.to_f >= params[:boot][:usd].to_f
            if params[:boot][:usd].to_f >= 10.0
              @boot_dek = Boot.new(boot_params)
              if @boot_dek.save
                @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:boot][:usd], :detail => "Debited_for_Bot_trading")
                if @usdwallet.save
                  render json: {success: true}
                else
                  render json: { status: 'error', message: "Something wen't wrong!" }, status: :unprocessable_entity
                end
              else
                render json: { status: 'error', message: "Something wen't wrong!" }, status: :unprocessable_entity
              end
            else
              render json: { status: 'error', message: "Amount should be greater than 10 USD!" }, status: :unprocessable_entity
            end
          else
              render json: { status: 'error', message: "Amount should be less than your wallet balance!" }, status: :unprocessable_entity
          end
        else
          @feesdata = Fee.find(2)
          fees = @feesdata.percent.to_f / 100
          params[:boot][:user_id] = current_user.id
          params[:boot][:fees] = params[:boot][:usd].to_f * fees
          params[:boot][:amount] = params[:boot][:usd].to_f / params[:boot][:btcrate].to_f
          params[:boot][:open] = true
          if usd_balance.to_f >= params[:boot][:usd].to_f
            if params[:boot][:usd].to_f >= 10.0
              @boot_dek = Boot.find_by(user_id: current_user.id)
              @boot_dek.update(amount: params[:boot][:amount].to_f, btcrate: params[:boot][:btcrate].to_f, fees: params[:boot][:fees], open: params[:boot][:open])
              if @boot_dek.save
                @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:boot][:usd].to_f, :detail => "Debited_for_Bot_trading")
                if @usdwallet.save
                  render json: {success: true}
                else
                  render json: { status: 'error', message: "Something wen't wrong!" }, status: :unprocessable_entity
                end
              else
                render json: { status: 'error', message: "Something wen't wrong!" }, status: :unprocessable_entity
              end
            else
              render json: { status: 'error', message: "Amount should be greater than 10 USD!" }, status: :unprocessable_entity
            end
          else
              render json: { status: 'error', message: "Amount should be less than your wallet balance!" }, status: :unprocessable_entity
          end
        end
      end
      def boot_off
        @boot_dek = Boot.find_by(user_id: current_user.id)
        calamount = @boot_dek.amount.to_f * @boot_dek.btcrate.to_f
        @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => calamount, :debit => 0.0, :detail => "Credited_Bot_Off")
        if @usdwallet.save
          @boot_dek.update(amount: 0.0, btcrate: 0.0, fees: 0.0, open: false)
        else
          render json: { status: 'error', message: "Something wen't wrong!" }, status: :unprocessable_entity
        end
          render json: {success: true}
      end
      def check_boot_dek
        if (current_user.boot_active == true)
          boot_dek = Boot.find_by(user_id: current_user.id)
          if boot_dek == nil
            render json: {bootdek: false}
          else
            if boot_dek.open == true
              render json: {bootdek: true, data: boot_dek}
            else
              render json: {bootdek: false}
            end
          end
        else
          render json: {bootdek: false}
        end
      end
      private
      def boot_params
          params.require(:boot).permit(:user_id, :amount, :btcrate, :fees, :open)
      end
      def serializer(records)
        BootprofitSerializer
          .new(records)
          .as_json
      end
    end
  end
end
