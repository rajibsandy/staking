Rails.application.routes.draw do
  root "pages#home"
  get "signup", to: "users#new"
  post 'users', to: 'users#create'
end
