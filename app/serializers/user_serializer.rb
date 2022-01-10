class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :password_digest
  has_many :stakes
  has_many :stakewallets
  has_many :stakewithdrawals
  has_many :orders
  has_many :bootprofits
  has_many :seller_requests
  has_many :seller_reviews
  has_many :buyer_requests
end
