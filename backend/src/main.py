from fastapi import FastAPI
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256

app = FastAPI()

# def create_keys():
#   key = RSA.generate(2048)
#   pvt = key.exportKey()
#   public = key.publickey().exportKey()

#   return pvt, public

def hash(msg: str):
  m = SHA256.new(msg.encode('utf-8'))
  return m

@app.get("/")
async def root():
  return { "message": 'Hello World' }

@app.get("/sign")
async def sign(msg: str):
  msg_hash = hash(msg)
  key = RSA.generate(2048)
  # pvt_key = key.exportKey()
  public_key = key.publickey().exportKey()
  signer = pkcs1_15.new(key)
  signature = signer.sign(msg_hash)
  return {
    "msg" : msg,
    "msg_hash" : msg_hash.hexdigest(),
    "public_key": public_key.hex(),
    "signature" : signature.hex()
  }