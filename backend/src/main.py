from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from data import SignData
from data import VerifyData
from data import HashData
from fastapi.middleware.cors import CORSMiddleware
import fitz  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def hash(msg: str):
    m = SHA256.new(msg.encode('utf-8'))
    return m

@app.get("/")
async def root():
    return { "message": 'Hello World' }

@app.post("/hash")
async def hash_data(data: HashData):
    h = hash(data.msg)
    return {
        "hash": h.hexdigest()
    }

@app.post("/sign")
async def sign(msg: SignData):
    msg_hash = hash(msg.msg)
    key = RSA.generate(2048)
    pvt_key = key.export_key()
    public_key = key.publickey().exportKey()
    signer = pkcs1_15.new(key)
    signature = signer.sign(msg_hash)
    return {
        "msg" : msg,
        "msg_hash" : msg_hash.hexdigest(),
        "public_key": public_key.hex(),
        "signature" : signature.hex(),
    }


@app.post("/verify")
async def check(data: VerifyData):
    public_key = bytes.fromhex(data.public_key)
    key = RSA.import_key(public_key)
    h = hash(data.msg)
    try:
        pkcs1_15.new(key).verify(h, bytes.fromhex(data.signature))
        return {
            'result' : 1
        }
    except (ValueError, TypeError):
        return {
            'result' : 0
        }

@app.post("/extract-text-from-pdf/")
async def extract_text_from_pdf(file: UploadFile = File(...)):
    try:
        pdf_file = await file.read()
        doc = fitz.open(stream=pdf_file, filetype="pdf")
        pdf_text = ""
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            pdf_text += page.get_text()

        return JSONResponse(content={"text": pdf_text})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
