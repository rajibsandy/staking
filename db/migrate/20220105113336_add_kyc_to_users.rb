class AddKycToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :mobileno, :string
    add_column :users, :bank_accountno, :string
    add_column :users, :bank_ifsccode, :string
    add_column :users, :bank_upi, :string
    add_column :users, :btcaddress, :string
    add_column :users, :idproof, :string
    add_column :users, :addressproof,:string
    add_column :users, :bank_passbook, :string
  end
end
