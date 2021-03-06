Rails.application.routes.draw do
  resources :funds
  resources :banks

  get '/history', to: 'funds#history', as: 'history'
  get '/trend', to: 'funds#trend', as: 'trend'
  get '/currencies', to: 'funds#currencies', as: 'currencies'
  get '/all_currencies', to: 'funds#all_currencies', as: 'all_currencies'
end
