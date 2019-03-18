Rails.application.routes.draw do
  get 'users/edit'

  get 'users/update'

  devise_for :users
  root to: "chat_spaces#index"
  resource :chat_spaces

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
