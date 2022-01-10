class CreateSellerReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :seller_reviews do |t|
      t.string :title
      t.string :description
      t.integer :score
      t.belongs_to :seller_request
      t.belongs_to :user
      t.timestamps
    end
  end
end
