from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('MirutaV1.apps.WebServices.wsEstaciones.views',
        url(r'^ws/Estaciones/$','wsEstaciones_view',name="ws_Estaciones_url"),
)


