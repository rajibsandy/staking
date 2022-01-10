class CreateBootplans < ActiveRecord::Migration[6.1]
  def change
    create_table :bootplans do |t|
      t.string :package_name
      t.float :amount
      t.string :details
      t.integer :months
      t.integer :amount_slash
      t.float :lvlone
      t.float :lvltwo
      t.float :lvlthree
      t.float :lvlfour
      t.float :lvlfive
      t.float :lvlsix
      t.float :lvlseven
      t.float :lvleight
      t.float :lvlnine
      t.float :lvlten
      t.timestamps
    end
  end
end
