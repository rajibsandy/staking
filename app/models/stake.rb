class Stake < ApplicationRecord
    belongs_to :user
    validates :amount, presence: true, length: { minimum: 1}
    validates :at_rate, presence: true
    validates :usd, presence: true
    validates :status, presence: true
    validates :withdrawal, presence: true
end
