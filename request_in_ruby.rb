require 'rest-client'
require 'pry'

response = RestClient.get('http://www.reddit.com')
binding.pry
