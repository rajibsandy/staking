class SellerReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :seller_request_id, :user_id
end
