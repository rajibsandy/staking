class AddSellerreviewToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :seller_review, :boolean, default: false
  end
end
