Rails.application.routes.draw do
  get "users/index"
  get "users/statistics"
  get "words/match_letters"
  patch "users/update_log"

  devise_for :users

  resources :words
  root to: "letters#index"
  get "up" => "rails/health#show", as: :rails_health_check
  resources :letters do
    collection do
      get 'learn' 
      get 'free_learn' 
    end
  end
  
end