class AddBootPlanColumToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :boot_plan, :integer
  end
end
