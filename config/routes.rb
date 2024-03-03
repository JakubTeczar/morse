Rails.application.routes.draw do
  get "users/index"
  get "users/statistics"
  get "/keyer/index"
  post '/users/export_to_pdf'
  post '/users/test_PDF'
  # config/routes.rb
  get "words/match_letters"
  get "home/index"
  get "/users/account"
  post "words/match_letters"

  patch "users/update_log"
  patch "users/update_log_words"

  devise_for :users

  resources :words
  
  root to: redirect('/keyer/index?level=auto')


  get "up" => "rails/health#show", as: :rails_health_check
  resources :letters do
    collection do
      get 'learn' 
      get 'keyer' 
      get 'free_learn' 
    end
  end
  
end