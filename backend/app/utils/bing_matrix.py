from app.settings import settings


async def get_route_matrix(origins, destinations):
    from azure.core.credentials import AzureKeyCredential
    from azure.maps.route.aio import MapsRouteClient
    from azure.maps.route.models import RouteMatrixQuery, GeoJsonMultiPoint

    maps_route_client = MapsRouteClient(credential=AzureKeyCredential(settings.azure_subscription_key))
    route_matrix_query = RouteMatrixQuery(
        origins=GeoJsonMultiPoint(coordinates=origins),
        destinations=GeoJsonMultiPoint(coordinates=destinations),
    )
    async with maps_route_client:
        request = await maps_route_client.begin_request_route_matrix(route_matrix_query=route_matrix_query,
                                                                     format="json")
        result = await request.result()

    return result

