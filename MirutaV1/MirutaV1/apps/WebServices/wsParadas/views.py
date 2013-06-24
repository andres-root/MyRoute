from django.http import HttpResponse
from MirutaV1.apps.masivo.models import Paradas
#Integramos la serializacion de los objetps
from django.core import serializers

def wsParadas_view(request):
        data = serializers.serialize("json",Paradas.objects.filter())
        #Retorna la informacion en formato json
        return  HttpResponse(data,mimetype='application/json')

