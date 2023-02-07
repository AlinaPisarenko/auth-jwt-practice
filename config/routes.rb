Rails.application.routes.draw do
  root to: 'users#index'
  get '/users', to: 'users#index'
  get '/me', to: 'users#me'
  post '/login', to: 'users#login'
  post '/signup', to: 'users#signup'
  get '/users/:id', to: 'users#show'
end
