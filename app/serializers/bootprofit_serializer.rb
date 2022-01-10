class BootprofitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :profit, :rate, :amount, :detail, :created_at, :updated_at
end
