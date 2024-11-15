FROM python:3.12.7-alpine3.20

WORKDIR /usr/src/app

RUN pip install "fastapi[standard]"
RUN pip install pycryptodome
RUN pip install PyMuPDF

COPY . . 

EXPOSE 8000

CMD ["fastapi", "run", "src/main.py"]

