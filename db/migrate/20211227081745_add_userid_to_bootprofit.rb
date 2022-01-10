class AddUseridToBootprofit < ActiveRecord::Migration[6.1]
  def change
    add_column :bootprofits, :user_id, :integer
  end
end
