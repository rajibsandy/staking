class Order < ApplicationRecord
    belongs_to :user
    validates :user_id, presence: true
    validates :amount, presence: true
    validates :btcrate, presence: true
    validates :profit, presence: true
    validates :fees, presence: true
end
