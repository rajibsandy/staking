class SellerRequest < ApplicationRecord
  belongs_to :user
  has_many :seller_reviews
  has_many :buyer_requests

  def uavg_score
    user.avg_score
  end
end
