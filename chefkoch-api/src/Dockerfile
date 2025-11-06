FROM python:3.11-slim

# Set working directory

WORKDIR /app

# install dependencies
RUN pip install fastapi uvicorn pydantic isodate requests bs4

# copy app code
COPY . .

# expose api port
EXPOSE 5001

# start server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5001"]
