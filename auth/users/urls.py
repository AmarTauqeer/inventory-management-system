from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, ActivateView, ActivationConfirm, \
    ResetPasswordEmailView, ResetPasswordView, ResetPasswordConfirmView

urlpatterns = [
    path('register', RegisterView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('user', UserView.as_view(), name="user"),
    path('logout', LogoutView.as_view(), name="logout"),
    path('activate/<str:uid>/<str:token>',
         ActivateView.as_view(), name='activate'),
    path('activate/confirm',
         ActivationConfirm.as_view(), name='activate confirm'),
    path('reset_password', ResetPasswordEmailView.as_view(),
         name='reset_password_email'),
    path('reset_password/<str:uid>/<str:token>/',
         ResetPasswordView.as_view(), name='reset_password'),
    path('reset_password_confirm', ResetPasswordConfirmView.as_view(),
         name='reset_password_confirm'),
]
