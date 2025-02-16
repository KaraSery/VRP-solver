import json
from azure.core.exceptions import HttpResponseError
from dotenv import load_dotenv
from fastapi import FastAPI
import os
from app.utils.bing_matrix import get_route_matrix
from app.utils.simple_tsp_solver import simple_tsp_solver, get_routes
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
frontend_origin = [os.getenv("FRONTEND_ORIGIN")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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

@app.get("/solve")
def solve_simple_tsp(distance_matrix, num_vehicles, depot):
    [solution, routing, manager] = simple_tsp_solver(distance_matrix, num_vehicles, depot)
    routes = get_routes(solution, routing, manager)
    return routes




