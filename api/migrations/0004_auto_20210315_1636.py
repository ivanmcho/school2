# Generated by Django 2.2.13 on 2021-03-15 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_telefono'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='telefono',
        ),
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]