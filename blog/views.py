from django.shortcuts import render


def index(request):
    """
    Main blog page
    """
    return render(request, 'index.html')
