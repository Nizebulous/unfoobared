import logging

from django.shortcuts import render


log = logging.getLogger(__name__)


def blog_index(request):
    """
    Blog index page
    """
    return render(request, 'blog_index.html')


def blog_detail(request, year=None, month=None, slug=None):
    """
    Detail blog page
    """
    return render(
        request,
        'blog_entry.html',
        context={
            'year': year,
            'month': month,
            'slug': slug,
        }
    )


def projects(request):
    """
    Render the 'projects' page
    """
    return render(request, 'projects.html')


def about_me(request):
    """
    Render the 'about me' page
    """
    return render(request, 'about_me.html')
