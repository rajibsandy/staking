class AddEmailVerificationToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :email_verified_at, :timestamps
    add_column :users, :mobile_verified_at, :timestamps    
  end
end
