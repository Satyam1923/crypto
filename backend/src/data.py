from pydantic import BaseModel

class SignData(BaseModel):
  msg: str


class VerifyData(BaseModel):
  msg: str
  public_key: str
  signature: str