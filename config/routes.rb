Rails.application.routes.draw do

  #---------------------Pages-------------------
  root "pages#index"

# #-----------------Authentication------------
post "signup", to: "users#create"
post "login", to: "sessions#create"
get "logout", to: "sessions#destroy"
# #-----------------StakeActions--------------

post "release", to: "stakes#release"
get 'stake/:id', to: "pages#stakewithdrawal"
#-------------Balance ------------------------

get 'btchg_balance', to: "users#user_btchg_balance"
get 'usd_balance', to: "users#user_usd_balance"
#---------------- Rate -------------------------
get 'hedgerate', to: "users#current_hedge_rate"
#-------- Detials ------------------------------
get "details/user", to: "users#details"
post "referral", to: "users#referral"
post "kyc_upload", to: "users#kyc_upload"
post "save_bank", to: "users#save_bank"

# ---------------- Api V1 ----------------------
get "stakes", to: "pages#index"
get "buyer", to: "pages#index"
get "trades", to: "pages#index"
get "boots", to: "pages#index"
get "swaps", to: "pages#index"
get "ptops", to: "pages#index"
get "referrals", to: "pages#index"
get "wallets", to: "pages#index"
get "profile", to: "pages#index"
post "user_profile", to: "users#user_profile"
post "sendotp", to: "users#sendotp"
post "user_profile_mobile", to: "users#user_profile_mobile"

namespace :api do
  namespace :v1 do
    resources :stakes, only: %i[create index]
    resources :swaps, only: %i[create]
    resources :orders, only: %i[create index]
    resources :boots, only: %i[index]
    resources :sellerrequests, only: %i[index create]
    resources :buyerrequests, only: %i[index create]
    resources :proofuploads, only: %i[create]
    resources :sellerreviews, only: %i[create]

    get "usdwallets", to: "wallets#usdwallets"
    get "btchgwallets", to: "wallets#btchgwallets"
    post "stakewithdrawals", to: "stakewithdrawals#stakewithdrawals"
    post "approveproof", to: "peers#approveproof"
    post "rejectproof", to: "peers#rejectproof"

    get "seller/bank_details", to: "sellerrequests#seller_bank_details"
    get "checkproofbuyer", to: "proofuploads#checkproofbuyer"
    get "checkproofseller", to: "proofuploads#checkproofseller"
    get "sellerbuyreq", to: "sellerrequests#seller_by_sellerreqid"
    post "seller/details", to: "sellerrequests#seller_user"
    post "buyer/approve", to: "buyerrequests#accept"
    post "buyer/reject", to: "buyerrequests#reject"
    get "buyer/request", to: "sellerrequests#buyerrequest"
    post "sellerrequests/close", to: "sellerrequests#sellerclose"
    get "seller/status", to: "sellerrequests#checkrequest"
    get "buyer/status", to: "buyerrequests#checkrequest"
    get "plan/boot" , to: "boots#boot_plans"
    post 'boot/activate', to: "boots#activate"
    get 'deactive_orders', to: "orders#deactive_orders"
    post 'closeOrder', to: "orders#close_order"
    get 'bootdek', to: "boots#check_boot_dek"
    post 'bootOn', to: "boots#boot_on"
    get 'bootOff', to: "boots#boot_off"

    get 'levelone', to: "levels#levelone"
    get 'leveltwo', to: "levels#leveltwo"
    get 'levelthree', to: "levels#levelthree"
    get 'levelfour', to: "levels#levelfour"
    get 'levelfive', to: "levels#levelfive"
    get 'levelsix', to: "levels#levelsix"
    get 'levelseven', to: "levels#levelseven"
    get 'leveleight', to: "levels#leveleight"
    get 'levelnine', to: "levels#levelnine"
    get 'levelten', to: "levels#levelten"

  end
end
# -------------- all routes --------------------
  get "*path" ,to: 'pages#index', via: :all

end
