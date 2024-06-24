# users/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import UserRegisterForm, UserLoginForm
from django.contrib.auth.models import User

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            messages.success(request, f'Account created for {email}!')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'html/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=User.objects.get(email=email), password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'Successfully logged in as {email}')
                return redirect('home')
            else:
                messages.error(request, 'Invalid credentials')
    else:
        form = UserLoginForm()
    return render(request, 'html/login.html', {'form': form})

from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import UserProfileForm
from .models import UserProfile

@login_required
def profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Профиль жаңартылды.')
            return redirect('profile')
    else:
        form = UserProfileForm(instance=user_profile)
    return render(request, 'html/profile.html', {'form': form})



from django.shortcuts import render, redirect
from .models import News, Category
from .forms import NewsForm

def create_news(request):
    if request.method == 'POST':
        form = NewsForm(request.POST, request.FILES)
        if form.is_valid():
            news = form.save(commit=False)
            news.user = request.user
            news.save()
            return redirect('home')
    else:
        form = NewsForm()
    return render(request, 'html/create_news.html', {'form': form})

def news_list(request):
    slides = News.objects.all().order_by('-created_at')
    categories = Category.objects.all()
    return render(request, 'html/index.html', {'slides': slides, 'categories': categories})

def category_news(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    slides = category.news.all().order_by('-created_at')
    categories = Category.objects.all()
    return render(request, 'html/index.html', {'slides': slides, 'categories': categories, 'current_category': category})



from django.contrib.auth.decorators import login_required

@login_required
def my_news(request):
    user_news = News.objects.filter(user=request.user).order_by('-created_at')
    categories = Category.objects.all()
    return render(request, 'html/my_news.html', {'user_news': user_news, 'categories': categories})
@login_required
def edit_news(request, pk):
    news = get_object_or_404(News, pk=pk)
    if request.method == 'POST':
        form = NewsForm(request.POST, request.FILES, instance=news)
        if form.is_valid():
            form.save()
            return redirect('my_news')
    else:
        form = NewsForm(instance=news)
    return render(request, 'html/edit_news.html', {'form': form})

@login_required
def delete_news(request, pk):
    news = get_object_or_404(News, pk=pk)
    if request.method == 'POST':
        news.delete()
        return redirect('my_news')
    return render(request, 'html/delete_news.html', {'news': news})