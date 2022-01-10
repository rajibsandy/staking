class AddColumBootActiveToUsers < ActiveRecord::Migration[6.1]
  def change
        add_column :users, :boot_active, :boolean
  end
end
