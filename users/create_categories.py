from django.core.management.base import BaseCommand
from users.models import Category

class Command(BaseCommand):
    help = 'Create default categories'

    def handle(self, *args, **kwargs):
        categories = ['Саясат', 'Экономика', 'Спорт', 'Мәдениет', 'Қоғам']
        for category in categories:
            Category.objects.get_or_create(name=category)
        self.stdout.write(self.style.SUCCESS('Successfully created categories'))
