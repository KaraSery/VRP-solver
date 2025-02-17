from pydantic import BaseModel


class Location(BaseModel):
    lat: float
    lng: float

class Matrix(BaseModel):
    matrix: list[list[float]]

class Fleet(BaseModel):
    vehicles: int
    depot: int