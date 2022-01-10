class CreateBootprofits < ActiveRecord::Migration[6.1]
  def change
    create_table :bootprofits do |t|
      t.float :profit
      t.float :rate
      t.float :amount
      t.string :detail
      t.timestamps
    end
  end
end
