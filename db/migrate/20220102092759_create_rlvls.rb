class CreateRlvls < ActiveRecord::Migration[6.1]
  def change
    create_table :rlvls do |t|
      t.belongs_to :user
      t.string :rlvlone
      t.string :rlvltwo
      t.string :rlvlthree
      t.string :rlvlfour
      t.string :rlvlfive
      t.string :rlvlsix
      t.string :rlvlseven
      t.string :rlvleight
      t.string :rlvlnine
      t.string :rlvlten
      t.timestamps
    end
  end
end
