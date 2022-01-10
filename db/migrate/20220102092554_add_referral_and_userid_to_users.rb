class AddReferralAndUseridToUsers < ActiveRecord::Migration[6.1]
  def change
      add_column :users, :userid, :string
      add_column :users, :referral, :string
  end
end
