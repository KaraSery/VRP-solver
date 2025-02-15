FROM python:3.10

WORKDIR /code

COPY requirements.in /code/requirements.in

RUN pip install pip-tools
RUN pip-compile /code/requirements.in
RUN pip install -r /code/requirements.txt

COPY ./app /code/app

CMD ["fastapi", "run", "app/main.py", "--port", "80"]
