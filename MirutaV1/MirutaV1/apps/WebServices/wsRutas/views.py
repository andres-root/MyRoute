from django.http import HttpResponse
from MirutaV1.apps.masivo.models import Ruta
#Integramos la serializacion de los objetps
from django.core import serializers

def wsRutas_view(request):
        data = serializers.serialize("json",Ruta.objects.filter())
        #Retorna la informacion en formato json
        return  HttpResponse(data,mimetype='application/json')






