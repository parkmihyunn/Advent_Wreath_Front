# Generated by Django 4.1.3 on 2022-12-07 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='id',
        ),
        migrations.RemoveField(
            model_name='user',
            name='uid',
        ),
        migrations.AddField(
            model_name='user',
            name='u_id',
            field=models.CharField(default=1, max_length=100, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
    ]
