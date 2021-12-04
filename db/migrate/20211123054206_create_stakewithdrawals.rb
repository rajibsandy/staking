class CreateStakewithdrawals < ActiveRecord::Migration[6.1]
  def change
    create_table :stakewithdrawals do |t|
      t.integer :user_id
      t.integer :stake_id
      t.boolean :monthly
      t.float :amount
      t.float :usd
      t.integer :status
      t.timestamps
    end
  end
end
