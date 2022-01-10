class CreateSellerRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :seller_requests do |t|
      t.integer :user_id
      t.float :amount
      t.float :rate
      t.string :gateway
      t.boolean :busy
      t.boolean :open
      t.timestamps
    end
  end
end
