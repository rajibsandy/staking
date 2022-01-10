class ChangeColumnnameOfProofUploadtwo < ActiveRecord::Migration[6.1]
  def change
    remove_column :proofuploads, :buyer_request
    add_column :proofuploads, :buyer_request_id, :integer
  end
end
