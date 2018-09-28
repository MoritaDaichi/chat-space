Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    collection do
      get 'adduser'
      delete 'deleteuser'
    end
    resources :messages, only: [:index, :create]
  end
end
