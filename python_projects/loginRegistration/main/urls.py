from django.urls import path
from . import views

urlpatterns = [
    path('', views.root),
    path('reg_process', views.reg_process),
    path('login', views.login),
    path('dashboard', views.success),

    path('newticket', views.newticket),
    path('newticketprocess', views.newticketprocess),

    path('logout', views.logout),
    path('delete/<id>', views.delete),
]