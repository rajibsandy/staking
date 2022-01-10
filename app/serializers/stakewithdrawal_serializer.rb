class StakewithdrawalSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :stake_id, :monthly, :amount, :usd, :status
end
