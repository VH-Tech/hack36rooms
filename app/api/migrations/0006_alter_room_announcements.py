# Generated by Django 4.0.2 on 2022-02-27 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_room_host_key'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='announcements',
            field=models.TextField(null=True),
        ),
    ]
