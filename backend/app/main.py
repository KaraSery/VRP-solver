import json
import os
from typing import Union

import requests
from azure.core.exceptions import HttpResponseError
from fastapi import FastAPI
from pydantic.v1 import JsonError
from starlette.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

import asyncio

from app.utils import get_route_matrix
from app.utils.simple_tsp_solver import simple_tsp_solver, get_routes

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
@app.get("/ok")
async def routes_matrix():
    cwd=os.getcwd()
    with open(cwd + "/routesDataTest.json", "r") as file:
        routes = json.load(file)
        locations = list(map(lambda route: [route["location"]["lng"], route["location"]["lat"]], routes))
        try:
            matrix = await get_route_matrix(locations, locations)
            return matrix
        except HttpResponseError as e:
            return e

def solve_simple_tsp(distance_matrix, num_vehicles, depot):
    [solution, routing, manager] = simple_tsp_solver(distance_matrix, num_vehicles, depot)
    routes = get_routes(solution, routing, manager)
    return routes




