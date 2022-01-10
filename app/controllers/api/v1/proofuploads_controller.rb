module Api
  module V1
    class ProofuploadsController < ApplicationController
      def create
        image = Cloudinary::Uploader.upload(params[:image], :folder => "Ptopproofsupload/")
        buyerrequest = current_user.buyer_requests.find_by(open: true, confirmation: true)
        proof = Proofupload.new(:user_id=> current_user.id, :proof => image["url"], :buyer_request_id => buyerrequest.id, :confirmation => false, :admin_check => false, :admin_confirmation => false, :open => true)
        proof.save
        seller = buyerrequest.seller_request.user
        message = "Dear #{seller.name}, Buyer have sent transaction to your account and uploaded proof! -BITCOINHEDGE"
        send_sms(seller.mobileno, message)
      end
      def checkproofbuyer
        buyerrequest = current_user.buyer_requests.find_by(open: true, confirmation: true)
        proof = buyerrequest.proofupload
        render json: {proof: proof}
      end
      def checkproofseller

        usersellerreq = current_user.seller_requests.find_by(open: true, busy: true)
        buyerrequest = usersellerreq.buyer_requests.find_by(open: true)
        proof = buyerrequest.proofupload
        render json: {proof: proof}
      end
    end
  end
end
