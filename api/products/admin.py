from django.contrib import admin
from .models import Product, SubCategory, SubProduct, SelectedSubProduct

admin.site.register(Product)
admin.site.register(SubCategory)
admin.site.register(SubProduct)
admin.site.register(SelectedSubProduct)
