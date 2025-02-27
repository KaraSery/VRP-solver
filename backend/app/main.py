import json
from azure.core.exceptions import HttpResponseError
from azure.maps.route.models import RouteMatrixResult, RouteMatrix
from dotenv import load_dotenv
from fastapi import FastAPI, Body
import os

from pydantic.v1 import BaseSettings
from starlette.responses import JSONResponse

from app.models import Location, Matrix, Fleet
from app.settings import settings
from app.utils.bing_matrix import get_route_matrix
from app.utils.simple_tsp_solver import simple_tsp_solver, get_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/get_matrix")
async def get_matrix(origins: list[Location], destinations: list[Location]):
    origins = list(map(lambda origin: [origin.lng, origin.lat], origins))
    destinations = list(map(lambda destination: [destination.lng, destination.lat], destinations))
    try:
        matrix = await get_route_matrix(origins, destinations)
        return matrix
    except HttpResponseError as e:
        return e

@app.post("/solve")
def solve_simple_tsp(matrix_result: dict=  Body(...), fleet: Fleet= Body(...)):
    matrix_result = RouteMatrixResult.from_dict(matrix_result)
    [solution, routing, manager] = simple_tsp_solver(matrix_result, fleet)
    if solution is None:
        return JSONResponse({"message": "No solution found"}, status_code=404)
    routes = get_routes(solution, routing, manager)
    return routes




