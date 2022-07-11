from django.contrib import admin
from .models import Product, SubCategory, SubProduct

admin.site.register(Product)
admin.site.register(SubCategory)
admin.site.register(SubProduct)
