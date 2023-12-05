Rails.application.routes.draw do
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
