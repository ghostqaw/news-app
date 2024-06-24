from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('profile/', views.profile, name='profile'),  # Add this line
    path('news/create/', views.create_news, name='create_news'),
    path('', views.news_list, name='news_list'),
    path('create/', views.create_news, name='create_news'),
    path('category/<int:category_id>/', views.category_news, name='category_news'),
    path('my_news/', views.my_news, name='my_news'),
    path('news/edit/<int:pk>/', views.edit_news, name='edit_news'),  # Маршрут для редактирования новости
    path('news/delete/<int:pk>/', views.delete_news, name='delete_news'),  # Маршрут для удаления новости
]

