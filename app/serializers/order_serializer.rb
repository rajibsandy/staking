class OrderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :amount, :btcrate, :profit, :fees, :open, :created_at, :updated_at
end
