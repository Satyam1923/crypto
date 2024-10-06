from fastapi import FastAPI
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
import hashlib

app = FastAPI()

# def create_keys():
#   key = RSA.generate(2048)
#   pvt = key.exportKey()
#   public = key.publickey().exportKey()

#   return pvt, public

def hash(msg: str):
  m = hashlib.sha256()
  m.update(bytes(msg, 'utf-8'))
  return m.hexdigest()

@app.get("/")
async def root():
  return { "message": 'Hello World' }

@app.get("/sign")
async def sign(msg: str):
  msg_hash = hash(msg)
  key = RSA.generate(2048)
  return { "msg_hash":msg_hash }