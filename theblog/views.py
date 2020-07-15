from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView
from theblog.models import Post
# Create your views here.
# def home(request):
#     return render(request, 'home.html', {})
class HomeView(ListView):
    model = Post
    template_name = 'home.html'
class ArticleDetailsView(DetailView):
    model = Post
    template_name = 'acticle_detail.html'
class AddPostView(CreateView):
    model = Post
    template_name = 'add_post.html'
    fields = '__all__'