# Generated by Django 4.2.1 on 2023-06-04 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0003_alter_profile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='city',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='profile',
            name='dob_privacy',
            field=models.CharField(blank=True, choices=[('none', 'Hiçbir Şeyi Gösterme'), ('age', 'Sadece Yaş'), ('month_day', 'Ay ve Gün'), ('show', 'Her Şeyi Göster')], default='age', max_length=20),
        ),
        migrations.AlterField(
            model_name='profile',
            name='status',
            field=models.CharField(blank=True, choices=[('ONLINE', 'Çevrimiçi'), ('OFFLINE', 'Çevrimdışı')], default='OFFLINE', max_length=20),
        ),
    ]
