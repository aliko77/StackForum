from pathlib import Path
import os
from datetime import timedelta

# BASE_URL = 'http://localhost:8000'
BASE_URL = 'http://api.alikoc.dev'

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-gacefy7x^b9gux^ell_*az_++r9^zr*x$qk_((+qf4gs4p&_k0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'api.alikoc.dev',
    'alikoc.dev'
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'core',
    'core.auth',
    'core.user',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'StackForum.urls'

AUTH_USER_MODEL = 'core_user.User'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'StackForum.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Şifre sıfırlama bağlantısının geçerlilik süresi
PASSWORD_RESET_TIMEOUT = 1800

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'tr'
LANGUAGES = [
    ('tr', 'Türkçe'),
    ('en', 'English'),
]

TIME_ZONE = 'Europe/Istanbul'

USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# URL used to access the media
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Email sunucu ayarları

EMAIL_HOST = 'sandbox.smtp.mailtrap.io'
EMAIL_HOST_USER = '562a52fa2435f9'
EMAIL_HOST_PASSWORD = '068c5e92d1826d'
EMAIL_PORT = '2525'

# React App

# REACT_APP_URL = os.getenv('REACT_APP_URL', 'http://localhost:5173')
REACT_APP_URL = os.getenv('REACT_APP_URL', 'http://alikoc.dev')

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # React uygulamasının yerel adresi
    'http://alikoc.dev'
]
CORS_ALLOW_CREDENTIALS = True  # CORS isteklerinde kullanıcı kimlik bilgileri gönderilmesine izin verir
CSRF_COOKIE_HTTPONLY = True  # CSRF cookie'sine JavaScript tarafından erişimi devre dışı bırakır
CSRF_COOKIE_SECURE = False  # CSRF cookie'sini sadece HTTPS üzerinden iletilmesini sağlar
SESSION_COOKIE_SECURE = False  # Oturum cookie'sini sadece HTTPS üzerinden iletilmesini sağlar
CSRF_COOKIE_SAMESITE = 'Lax'  # CSRF cookie'sini yalnızca aynı site üzerindeki isteklere gönderir
SESSION_COOKIE_SAMESITE = 'Lax'  # Oturum cookie'sini yalnızca aynı site üzerindeki isteklere gönderir
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # React uygulamasının yerel adresi
    'http://alikoc.dev'
]

CORS_EXPOSE_HEADERS = [
    'Content-Type',
    'Authorization',  # İsteğe bağlı olarak, kullanıcının yetkilendirme bilgilerini alabilirsiniz
    'x-csrftoken', # csrftoken
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer', ),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken', ),
    "UPDATE_LAST_LOGIN": True,

    "TOKEN_OBTAIN_SERIALIZER": "core.auth.serializers.CustomTokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "core.auth.serializers.CustomTokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "core.auth.serializers.CustomTokenVerifySerializer",

    # custom
    'AUTH_COOKIE': 'access',
    'AUTH_COOKIE_REFRESH': 'refresh',
    'AUTH_COOKIE_DOMAIN': None,
    'AUTH_COOKIE_SECURE': False,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_PATH': '/',
    'AUTH_COOKIE_SAMESITE': "Lax",
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'core.user.authentication.CustomAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ]
}

PROFILE_AVATAR_FILE = 'profile_pictures/default.jpg'
AVATAR_MAX_FILE_SIZE = 3 * 1024 * 1024 # 3MB
