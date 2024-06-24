from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    name = 'users'

    def ready(self):
        import users.signals

# apps.py
from django.apps import AppConfig

class YourAppConfig(AppConfig):
    name = 'users'

    def ready(self):
        import users.signals
