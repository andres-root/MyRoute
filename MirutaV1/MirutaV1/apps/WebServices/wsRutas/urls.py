from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('MirutaV1.apps.WebServices.wsRutas.views',
        url(r'^ws/Rutas/$','wsRutas_view',name="ws_Rutas_url"),
)


