class AddOpenColumnToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :open, :boolean
  end
end
