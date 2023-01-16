storage "file" {  
    path = "/vault/data"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = "true"
}

api_addr = "https://vault.${DNS_NAME}"
ui = true