from django.urls import path
from . import views
from .views import HomeView, ArticleDetailsView, AddPostView
urlpatterns = [
    # path('', views.home, name="home")
    path('', HomeView.as_view(), name='home'),
    #primary key
    path('article/<int:pk>',ArticleDetailsView.as_view(), name="article-details"),
    path('add_post/',AddPostView.as_view(), name="add_post"),

]
