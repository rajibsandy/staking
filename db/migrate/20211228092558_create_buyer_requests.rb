class CreateBuyerRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :buyer_requests do |t|
      t.float :amount
      t.float :rate
      t.boolean :confirmation
      t.belongs_to :user
      t.belongs_to :seller_request
      t.boolean :admin_check
      t.boolean :open
      t.timestamps
    end
  end
end
