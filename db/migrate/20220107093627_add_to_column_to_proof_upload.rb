class AddToColumnToProofUpload < ActiveRecord::Migration[6.1]
  def change
        add_column :proofuploads, :confirmation, :boolean
        add_column :proofuploads, :admin_check, :boolean
        add_column :proofuploads, :admin_confirmation, :boolean
        add_column :proofuploads, :open, :boolean        
  end
end
