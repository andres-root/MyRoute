from django.shortcuts import render_to_response
from django.template import RequestContext
from MirutaV1.apps.home.models import Sistema

sistema = Sistema.objects.get(id='1')


def index_view(request):
	return render_to_response('index.html',{'sistema':sistema},context_instance=RequestContext(request))	

def gps_view(request):
        return render_to_response('GPS.html',{'sistema':sistema},context_instance=RequestContext(request))

def manual_view(request):
        return render_to_response('manual.html',{'sistema':sistema},context_instance=RequestContext(request))


def rutas_view(request):
        return render_to_response('rutas.html',{'sistema':sistema},context_instance=RequestContext(request))


def estaciones_view(request):
        return render_to_response('estaciones.html',{'sistema':sistema},context_instance=RequestContext(request))


def mejor_ruta_view(request):
        return render_to_response('mejor_ruta.html',{'sistema':sistema},context_instance=RequestContext(request))



