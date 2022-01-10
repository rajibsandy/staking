class CreateHedgerates < ActiveRecord::Migration[6.1]
  def change
    create_table :hedgerates do |t|
      t.float :rate
      t.boolean :current
      t.timestamps
    end
  end
end
