wrk.method = "POST"
wrk.headers["Content-Type"] = "application/json"

function random_ip()
  return string.format("%d.%d.%d.%d",
    math.random(1, 255),
    math.random(0, 255),
    math.random(0, 255),
    math.random(1, 254))
end

function request()
  local now = tostring(os.time() * 1000)  -- ms timestamp
  local body = '{"clientTime":' .. now .. '}'
  wrk.headers["X-Forwarded-For"] = random_ip()
  return wrk.format(nil, body)
end
