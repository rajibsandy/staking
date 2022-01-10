class BuyerRequestSerializer
  include FastJsonapi::ObjectSerializer
  attributes :amount, :rate, :confirmation, :user_id, :seller_request_id, :admin_check, :open
end
