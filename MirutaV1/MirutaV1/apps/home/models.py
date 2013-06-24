from django.db 			import models
from django.contrib.auth.models import User

class Sistema(models.Model):

	user	      = models.OneToOneField(User)
	Nombre_sistema= models.CharField(max_length=200)
	ciudad =	models.CharField(max_length=100)

	def __unicode__(self):
		return self.Nombre_sistema



