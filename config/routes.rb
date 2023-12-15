Rails.application.routes.draw do
  get 'users/index'
  devise_for :users
  match '/users',   to: 'users#index',   via: 'get'
  resources :words
  root to = "letters#index"
  get "up" => "rails/health#show", as: :rails_health_check
  resources :letters do
    collection do
      get 'learn' 
    end
  end
    
  # end
  # Defines the root path route ("/")
  # root "posts#index"
end
