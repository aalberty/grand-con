require 'uri'
require 'net/http'

url = URI("https://dad-jokes.p.rapidapi.com/random/joke/png")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["X-RapidAPI-Key"] = '3a6791d0a2msh012c66c7071b10bp1a2d12jsn79f741182b36'
request["X-RapidAPI-Host"] = 'dad-jokes.p.rapidapi.com'

response = http.request(request)
puts response.read_body


