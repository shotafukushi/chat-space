Rails.application.routes.draw do
  get 'messages/index'

  devise_for :users
  root to: "groups#index"
  resource :chat_spaces
  resources :users, only: [:edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
