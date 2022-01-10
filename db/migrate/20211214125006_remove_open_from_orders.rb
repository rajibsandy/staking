class RemoveOpenFromOrders < ActiveRecord::Migration[6.1]
  def change
    remove_column :orders, :open
  end
end
