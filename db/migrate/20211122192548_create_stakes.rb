class CreateStakes < ActiveRecord::Migration[6.1]
  def change
    create_table :stakes do |t|
      t.integer :user_id
      t.float :amount
      t.float :at_rate
      t.float :usd
      t.integer :status
      t.integer :withdrawal
      t.timestamps
    end
  end
end
