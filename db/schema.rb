# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_08_130240) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.integer "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "bootplans", force: :cascade do |t|
    t.string "package_name"
    t.float "amount"
    t.string "details"
    t.integer "months"
    t.integer "amount_slash"
    t.float "lvlone"
    t.float "lvltwo"
    t.float "lvlthree"
    t.float "lvlfour"
    t.float "lvlfive"
    t.float "lvlsix"
    t.float "lvlseven"
    t.float "lvleight"
    t.float "lvlnine"
    t.float "lvlten"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bootprofits", force: :cascade do |t|
    t.float "profit"
    t.float "rate"
    t.float "amount"
    t.string "detail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
  end

  create_table "boots", force: :cascade do |t|
    t.integer "user_id"
    t.float "amount"
    t.float "btcrate"
    t.float "fees"
    t.boolean "open"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "btchgwallets", force: :cascade do |t|
    t.integer "user_id"
    t.float "credit"
    t.float "debit"
    t.string "detail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "buyer_requests", force: :cascade do |t|
    t.float "amount"
    t.float "rate"
    t.boolean "confirmation"
    t.integer "user_id"
    t.integer "seller_request_id"
    t.boolean "admin_check"
    t.boolean "open"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["seller_request_id"], name: "index_buyer_requests_on_seller_request_id"
    t.index ["user_id"], name: "index_buyer_requests_on_user_id"
  end

  create_table "fees", force: :cascade do |t|
    t.string "name"
    t.float "percent"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hedgerates", force: :cascade do |t|
    t.float "rate"
    t.boolean "current"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id"
    t.float "amount"
    t.float "btcrate"
    t.float "profit"
    t.float "fees"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "open"
  end

  create_table "proofuploads", force: :cascade do |t|
    t.integer "user_id"
    t.string "proof"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "buyer_request_id"
    t.boolean "confirmation"
    t.boolean "admin_check"
    t.boolean "admin_confirmation"
    t.boolean "open"
    t.index ["user_id"], name: "index_proofuploads_on_user_id"
  end

  create_table "rlvls", force: :cascade do |t|
    t.integer "user_id"
    t.string "rlvlone"
    t.string "rlvltwo"
    t.string "rlvlthree"
    t.string "rlvlfour"
    t.string "rlvlfive"
    t.string "rlvlsix"
    t.string "rlvlseven"
    t.string "rlvleight"
    t.string "rlvlnine"
    t.string "rlvlten"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_rlvls_on_user_id"
  end

  create_table "seller_requests", force: :cascade do |t|
    t.integer "user_id"
    t.float "amount"
    t.float "rate"
    t.string "gateway"
    t.boolean "busy"
    t.boolean "open"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "seller_reviews", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "score"
    t.integer "seller_request_id"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["seller_request_id"], name: "index_seller_reviews_on_seller_request_id"
    t.index ["user_id"], name: "index_seller_reviews_on_user_id"
  end

  create_table "stakes", force: :cascade do |t|
    t.integer "user_id"
    t.float "amount"
    t.float "at_rate"
    t.float "usd"
    t.integer "status"
    t.integer "withdrawal"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stakewallets", force: :cascade do |t|
    t.integer "user_id"
    t.float "credit"
    t.float "debit"
    t.string "detail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stakewithdrawals", force: :cascade do |t|
    t.integer "user_id"
    t.integer "stake_id"
    t.boolean "monthly"
    t.float "amount"
    t.float "usd"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "usdwallets", force: :cascade do |t|
    t.integer "user_id"
    t.float "credit"
    t.float "debit"
    t.string "detail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.boolean "boot_active"
    t.integer "boot_plan"
    t.datetime "boot_subscription"
    t.string "userid"
    t.string "referral"
    t.boolean "franchise_admin"
    t.integer "franchise_id"
    t.string "mobileno"
    t.string "bank_accountno"
    t.string "bank_ifsccode"
    t.string "bank_upi"
    t.string "btcaddress"
    t.string "idproof"
    t.string "addressproof"
    t.string "bank_passbook"
    t.datetime "email_verified_at"
    t.datetime "mobile_verified_at"
    t.boolean "kyc"
    t.string "checking"
    t.boolean "seller_review", default: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
