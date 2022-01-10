class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.float :amount
      t.float :btcrate
      t.float :profit
      t.float :fees
      t.boolean :open
      t.timestamps
    end
  end
end
