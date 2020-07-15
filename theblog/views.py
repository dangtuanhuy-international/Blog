from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView
from theblog.models import Post
from .forms import PostForm
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
    form_class = PostForm
    template_name = 'add_post.html'
    #fields = '__all__'