class SellerRequestSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :amount, :rate, :gateway, :busy, :open, :uavg_score
  has_many :buyer_requests
  has_many :seller_reviews
end
