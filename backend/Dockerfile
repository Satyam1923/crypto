FROM python:latest

WORKDIR /usr/src/app

RUN pip install "fastapi[standard]"

COPY . . 

EXPOSE 8000

CMD [ "fastapi", "dev", "src/main.py" ]

