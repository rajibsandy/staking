class CreateFees < ActiveRecord::Migration[6.1]
  def change
    create_table :fees do |t|
      t.string :name
      t.float :percent
      t.timestamps
    end
  end
end
