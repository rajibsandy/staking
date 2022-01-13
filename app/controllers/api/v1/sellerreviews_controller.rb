module Api
  module V1
    class SellerreviewsController < ApplicationController
      def create
        user = current_user
        buyerrequest = user.buyer_requests.last
        sellerrequest = buyerrequest.seller_request
        sellerreview = SellerReview.new(user_id: sellerrequest.user_id, seller_request_id: sellerrequest.id, score: params[:review][:score], title: params[:review][:title], description: params[:review][:description])
        sellerreview.save
        user.update(seller_review: false)
      end
    end
  end
end
