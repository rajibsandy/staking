module Api
  module V1
    class SellerrequestsController < ApplicationController
          before_action :require_user, only: [:index, :seller_user, :create, :sellerclose, :checkrequest], :raise => false
      def index
        data = serializer(sellers)
        render json: {main: data, pages: sellers.total_pages}
      end
      def seller_by_sellerreqid
        data = current_user.buyer_requests.find_by(open: true)
        if data != nil
          id = data.seller_request.user_id
          render json: {id: id}
        else
          id = 0
          render json: {id: id}
        end
      end
      def seller_user
        data = serializer(seller(params[:id]))
        render json: {main: data}
      end
      def buyerrequest
          @data = current_user.seller_requests.find_by(open: true)
          @data = @data.buyer_requests.find_by(open: true)
          if @data == nil
            render json: {checkrequest: false}
          else
            render json: {checkrequest: true, main: @data}
          end
      end
      def create
        feetable = Fee.find(3)
        fees = feetable.percent.to_f
        params[:sellerrequest][:busy] = false
        params[:sellerrequest][:open] = true
        params[:sellerrequest][:user_id] = current_user.id
        if params[:sellerrequest][:amount].to_f > fees
          if params[:sellerrequest][:amount].to_f <= usd_balance.to_f
            @sellerreq = SellerRequest.new(sellerrequest_params)
            if @sellerreq.save
                @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:sellerrequest][:amount].to_f, :detail => "Debited_for_Seller_request_creation")
                if @usdwallet.save
                    render json: {success: true}
                else
                    render json: { status: 'error', message: "Something went wrong!" }, status: :unprocessable_entity
                end
            else
                render json: { status: 'error', message: "Something went wrong!" }, status: :unprocessable_entity
            end

          else
              render json: { status: 'error', message: "Not enough balance!" }, status: :unprocessable_entity
          end
        else
            render json: { status: 'error', message: "Amount sould be greater than #{fees} USD!"  }, status: :unprocessable_entity
        end
      end


      def sellerclose
          @data = current_user.seller_requests.find_by(open: true)
          @data.update(open: false)
          @usdwallet = Usdwallet.new(:user_id => current_user.id, :credit => @data.amount.to_f, :debit => 0.0, :detail => "Credited_for_Seller_request_closing")
          if @usdwallet.save
              render json: {success: true}
          else
              render json: { status: 'error', message: "Something went wrong!" }, status: :unprocessable_entity
          end
      end

      def checkrequest
        @data = current_user.seller_requests.find_by(open: true)
        if @data == nil
          render json: {checkrequest: false}
        else
          render json: {checkrequest: true, main: @data}
        end
      end
      def seller_bank_details

          @data = current_user.buyer_requests.find_by(open: true)
          user = @data.seller_request.user
          render json: {main: user}
      end
      private
      def sellers
        @sellers ||= SellerRequest.where(open: true).paginate(page: params[:page], per_page: 10).order('created_at DESC')
      end
      def seller(id)
        @seller ||= SellerRequest.where(user_id: id, open: true)
      end
      def sellerrequest_params
          params.require(:sellerrequest).permit(:user_id, :amount, :rate , :gateway, :busy, :open)
      end

      def serializer(records)
        SellerRequestSerializer
          .new(records)
          .as_json
      end
    end
  end
end
