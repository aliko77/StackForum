# Generated by Django 4.2.2 on 2023-07-13 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('topic_tags', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tag',
            options={'ordering': ['-created_at'], 'verbose_name': 'Konu/Soru Etiketi', 'verbose_name_plural': 'Konu/Soru Etiketleri'},
        ),
    ]
