class StakeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :amount, :at_rate, :usd, :status, :withdrawal, :created_at, :updated_at
  has_many :stakewithdrawals
end
