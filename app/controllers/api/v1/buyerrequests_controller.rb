module Api
  module V1
    class BuyerrequestsController < ApplicationController
          before_action :require_user, only: [:checkrequest, :create, :accept, :reject], :raise => false
      def index

      end

      def checkrequest
        @data = current_user.buyer_requests.find_by(open: true)
        if @data == nil
          render json: {checkrequest: false}
        else
          render json: {checkrequest: true, main: @data}
        end
      end
      def create
        params[:buyer][:amount] = params[:buyer][:amount].to_f
        params[:buyer][:rate] = params[:buyer][:rate].to_f
        params[:buyer][:confirmation] = false
        params[:buyer][:user_id] = current_user.id
        params[:buyer][:admin_check] = false
        params[:buyer][:open] = true
        params[:buyer][:seller_request_id] = params[:buyer][:seller_request_id].to_i
        sellerreq = SellerRequest.find(params[:buyer][:seller_request_id])
        if params[:buyer][:amount] <= sellerreq.amount
          sellerreq.update(busy: true)
          @buyerrequest = BuyerRequest.new(buyer_params)
          if @buyerrequest.save
            seller = sellerreq.user
            message = "#{seller.name}, you have one buyer request! check in P2P section! -BITCOINHEDGE"
            send_sms(seller.mobileno, message)
            render json: {success: true}
          else
              render json: { status: 'error', message: "Something went wrong!" }, status: :unprocessable_entity
          end
        else
            render json: { status: 'error', message: "Amount should not be greater than sellers alloted coins" }, status: :unprocessable_entity
        end
      end
      def accept
        buyer = BuyerRequest.find(params[:id])
        buyer.update(confirmation: true)
        message = "Dear #{buyer.user.name}, Your request has approved by the seller, Kindly send your requested amount and valid proof to seller! - BITCOINHEDGE"
        send_sms(buyer.user.mobileno, message)
      end

      def reject
        buyer = BuyerRequest.find(params[:id])
        buyer.update(open: false)
        buyer.seller_request.update(busy: false)
        message = "Dear #{buyer.user.name}, We are sorry to inform you that your request has rejected by the seller! - BITCOINHEDGE"
        send_sms(buyer.user.mobileno, message)
      end

      private
      def buyer_params
          params.require(:buyer).permit(:user_id, :amount, :rate , :confirmation, :seller_request_id, :admin_check, :open)
      end
    end
  end
end
