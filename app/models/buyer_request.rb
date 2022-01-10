class BuyerRequest < ApplicationRecord
  belongs_to :user
  belongs_to :seller_request
  has_one :proofupload
end
