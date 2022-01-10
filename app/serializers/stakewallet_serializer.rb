class StakewalletSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :credit, :debit, :detail
end
