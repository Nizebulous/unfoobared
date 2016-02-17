from django.shortcuts import render


def blog_index(request):
    return render(request, 'blog_index.html')


def blog_detail(request, year=None, month=None, day=None, slug=None):
    """
    Detail blog page
    """
    return render(
        request,
        'blog_detail.html',
        context={
            'year': year,
            'month': month,
            'day': day,
            'slug': slug,
        }
    )
