"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from buildIT import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'api/recommend/$', views.recommend, name='recommend'),
    url(r'api/tools/$', views.tools, name='tools'),
    url(r'api/videos/$', views.videos, name='videos'),
    url(r'api/manual/$', views.step_manual, name='manual'),
    url(r'api/furniture_info/$', views.furniture_info, name='furniture_info'),
    url(r'api/search/$', views.search, name='search'),
    url(r'api/comment/$', views.comment, name='comment')
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)