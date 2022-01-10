class ChangeColumnnameOfProofUpload < ActiveRecord::Migration[6.1]
  def change
    remove_column :proofuploads, :buyerrequest_id
    add_column :proofuploads, :buyer_request, :belongs_to
  end
end
