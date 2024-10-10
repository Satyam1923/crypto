FROM python:3.12.7-alpine3.20

WORKDIR /usr/src/app

RUN pip install "fastapi[standard]"
RUN pip install pycryptodome

COPY . . 

EXPOSE 8000

#CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
CMD ["fastapi", "run", "src/main.py"]

