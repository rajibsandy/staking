class User < ApplicationRecord
    attr_accessor :avg_score
    has_many :stakes
    has_many :btchgwallets
    has_many :stakewithdrawals
    has_many :orders
    has_many :usdwallets
    has_many :bootprofits
    has_one :boot
    has_many :seller_reviews
    has_many :seller_requests
    has_many :buyer_requests
    validates :name, presence: true, length: { minimum: 3, maximum: 25}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, uniqueness: {case_sensitive: false}, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 255}
    has_secure_password

    def avg_score
      return 0 unless seller_reviews.count.positive?
      seller_reviews.average(:score).round(2).to_f
    end
end
