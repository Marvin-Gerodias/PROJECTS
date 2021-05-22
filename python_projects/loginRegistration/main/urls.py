from django.urls import path
from . import views

urlpatterns = [
    path('', views.root),
    path('reg_process', views.reg_process),
    path('login', views.login),

    path('dashboard', views.success),
    path('mytickets', views.mytickets),
    path('newticket', views.newticket),
    path('newticketprocess', views.newticketprocess),
    path('ticket/<int:id>', views.ticket),
    path('commentprocess/<int:id>', views.commentprocess),
    path('deletecomment/<int:id>', views.deletecomment),
    path('editticket/<int:id>', views.editticket),
    path('editticketprocess/<int:id>', views.editticketprocess),
    path('deleteticket/<int:id>', views.deleteticket),

    path('logout', views.logout),
    path('delete/<id>', views.delete),
]