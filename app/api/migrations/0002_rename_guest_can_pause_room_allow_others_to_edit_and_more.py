# Generated by Django 4.0.2 on 2022-02-26 17:00

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='guest_can_pause',
            new_name='allow_others_to_edit',
        ),
        migrations.RenameField(
            model_name='room',
            old_name='host',
            new_name='host_key',
        ),
        migrations.RemoveField(
            model_name='room',
            name='votes_to_skip',
        ),
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True),
        ),
    ]
