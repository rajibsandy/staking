class SellerReview < ApplicationRecord
  belongs_to :user
  belongs_to :seller_request
end
