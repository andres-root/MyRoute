from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('MirutaV1.apps.WebServices.wsParadas.views',
        url(r'^ws/Paradas/$','wsParadas_view',name="ws_Paradas_url"),
)


