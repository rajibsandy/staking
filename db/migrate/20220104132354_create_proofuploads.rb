class CreateProofuploads < ActiveRecord::Migration[6.1]
  def change
    create_table :proofuploads do |t|
      t.belongs_to :user
      t.belongs_to :buyerrequest
      t.string :proof
      t.timestamps
    end
  end
end
