from django.conf.urls import patterns, include, url
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'MirutaV1.views.home', name='home'),
    # url(r'^MirutaV1/', include('MirutaV1.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^',include('MirutaV1.apps.home.urls')),
    url(r'^',include('MirutaV1.apps.WebServices.wsEstaciones.urls')),
    url(r'^',include('MirutaV1.apps.WebServices.wsRutas.urls')),
    url(r'^',include('MirutaV1.apps.WebServices.wsParadas.urls')),
    # url(r'^',include('MirutaV1.apps.masivo.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT}),

)
