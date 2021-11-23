Rails.application.routes.draw do
  
  #---------------------Pages----------------------------
  root "pages#home"
  get 'stake', to: "pages#stake"
  #-----------------Authentication-----------------------
  get "signup", to: "users#new"
  post "users", to: "users#create"
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  get "logout", to: "sessions#destroy"
  #-----------------StakeActions-------------------------
  post "stakes", to: "stakes#create"
  post "release", to: "stakes#release"

end
