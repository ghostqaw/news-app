# Generated by Django 3.1.3 on 2024-06-01 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20240601_2141'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='source',
            field=models.URLField(blank=True, null=True),
        ),
    ]