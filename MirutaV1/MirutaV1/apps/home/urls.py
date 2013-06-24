from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('MirutaV1.apps.home.views',
        url(r'^$','index_view',name='vista_inicial'),
	url(r'^gps/$','gps_view',name='vista_gps'),
	url(r'^manual/$','manual_view',name='vista_manual'),
	url(r'^rutas/$','rutas_view',name='vista_rutas'),
	url(r'^estaciones/$','estaciones_view',name='vista_estaciones'),
)
