from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from users.models import UserProfile


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(label=_('Электрондық пошта'), required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        labels = {
            'username': _('Пайдаланушы аты'),
            'password1': _('Құпиясөз'),
            'password2': _('Құпиясөзді растаңыз'),
        }
        help_texts = {
            'username': _('150 таңбадан аспауы керек. Әріптер, сандар және @/./+/-/_ белгілері.'),
            'password1': _('Құпиясөзіңіз басқа жеке ақпараттарыңызға тым ұқсас болмауы керек. '
                           'Құпиясөз кемінде 8 таңбадан тұруы керек. '
                           'Құпиясөз кеңінен қолданылатын құпиясөз болмауы керек. '
                           'Құпиясөз тек қана цифрлардан тұрмауы керек.'),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in ['username', 'password1', 'password2']:
            self.fields[field_name].help_text = None
class UserLoginForm(forms.Form):
    email = forms.EmailField(label=_('Электрондық пошта'))
    password = forms.CharField(widget=forms.PasswordInput, label=_('Құпиясөз'))

# forms.py
from django import forms
from .models import UserProfile

class UserProfileForm(forms.ModelForm):
    email = forms.EmailField(label='Электрондық пошта')

    class Meta:
        model = UserProfile
        fields = ['phone_number', 'photo', 'email']
        labels = {
            'phone_number': 'Телефон нөмірі',
            'photo': 'Фото',
        }

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(UserProfileForm, self).__init__(*args, **kwargs)
        if user:
            self.fields['email'].initial = user.email

    def save(self, commit=True):
        user = super(UserProfileForm, self).save(commit=False)
        user.user.email = self.cleaned_data['email']
        if commit:
            user.save()
            user.user.save()
        return user



from .models import News

class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = ['category', 'title', 'description', 'image', 'source']
        labels = {
            'category': 'Санат',
            'title': 'Тақырып',
            'description': 'Сипаттама',
            'image': 'Сурет',
            'source': 'Дереккөз'  # Label for the new source field
        }




