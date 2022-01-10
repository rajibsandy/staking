module Api
  module V1
      class OrdersController < ApplicationController
            before_action :require_user, only: [:index, :deactive_orders, :create, :close_order], :raise => false
        def index
          data = serializer(orders)
          render json: {main: data, pages: orders.total_pages}
        end

        def deactive_orders
          data = serializer(old_orders)
          render json: {main: data, pages: orders.total_pages}
        end

        def create
          @feesdata = Fee.find(1)
          fees = @feesdata.percent.to_f / 100
          params[:order][:user_id] = current_user.id
          params[:order][:profit] = 0
          params[:order][:fees] = params[:order][:usd].to_f * fees
          cutfeesamount = params[:order][:usd].to_f - params[:order][:fees].to_f
          params[:order][:amount] = cutfeesamount / params[:order][:btcrate].to_f
          params[:order][:open] = true
          if usd_balance.to_f >= params[:order][:usd].to_f
            if params[:order][:usd].to_f >= 10.0
              @order = Order.new(order_params)
              if @order.save
                @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:order][:usd], :detail => "Debited_for_Trading")
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

        def close_order
          @order = Order.find(params[:closeOrder][:id])
          calprofit = ((params[:closeOrder][:btcrate].to_f - @order.btcrate.to_f) * @order.amount.to_f) / 2
          if calprofit > 0
            @order.update(profit: calprofit, open: false)

            @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => calprofit, :debit => 0.0, :detail => "Profit_of_Trading")
            @usdwallet.save

            usd = @order.btcrate.to_f * @order.amount.to_f
            @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => usd, :debit => 0.0, :detail => "Trading_Fund_Relased")
            @usdwallet.save
            render json: {success: true}
          else
            @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => 0.0, :detail => "Profit_of_Trading")
            @usdwallet.save
            usd = @order.btcrate.to_f * @order.amount.to_f
            @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => usd, :debit => 0.0, :detail => "Trading_Fund_Relased")
            @usdwallet.save
            @order.update(profit: 0, open: false)
            render json: {success: true}
          end
        end

        private
          def order_params
              params.require(:order).permit(:user_id, :amount, :btcrate, :profit, :fees, :open)
          end
          def orders
            @user = User.find(current_user.id)
            @orders ||= @user.orders.where(open: true).paginate(page: params[:page], per_page: 10).order('created_at DESC')
          end

          def old_orders
            @user = User.find(current_user.id)
            @orders ||= @user.orders.where(open: false).paginate(page: params[:page], per_page: 10).order('updated_at DESC')
          end

          def serializer(records)
            OrderSerializer
              .new(records)
              .as_json
          end
      end
  end
end
