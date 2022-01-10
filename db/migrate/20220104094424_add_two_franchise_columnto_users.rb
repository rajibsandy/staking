class AddTwoFranchiseColumntoUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :boot_subcription
    add_column :users, :franchise_admin, :boolean
    add_column :users, :franchise_id, :integer
  end
end
