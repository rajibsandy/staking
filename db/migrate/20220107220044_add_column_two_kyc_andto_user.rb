class AddColumnTwoKycAndtoUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :kyc, :boolean
    add_column :users, :checking, :string
  end
end
