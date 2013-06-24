from django.http import HttpResponse
from MirutaV1.apps.masivo.models import Estacion
#Integramos la serializacion de los objetps
from django.core import serializers

def wsEstaciones_view(request):
        data = serializers.serialize("json",Estacion.objects.filter())
        #Retorna la informacion en formato json
        return  HttpResponse(data,mimetype='application/json')

