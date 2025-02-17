from dotenv import load_dotenv
from pydantic.v1 import BaseSettings

load_dotenv(verbose=True)

class Settings(BaseSettings):
    dev_frontend_origin: str
    azure_subscription_key: str
    class Config:
        env_file = ".env"


settings = Settings()