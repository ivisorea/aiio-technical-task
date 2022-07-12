from .models import Product, SubCategory, SubProduct, SelectedSubProduct
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    productName = serializers.CharField(source='name')

    class Meta:
        model = Product
        fields = ['id', 'productName']



class SubCategorySerializer(serializers.ModelSerializer):
    productId = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product'
    )
    subcategoryName = serializers.CharField(source='name')

    class Meta:
        model = SubCategory
        fields = ['id', 'subcategoryName', 'productId']


class SubProductSerializer(serializers.ModelSerializer):
    subcategoryId = serializers.PrimaryKeyRelatedField(
        queryset=SubCategory.objects.all(),
        source='subcategory'
    )
    subproductName = serializers.CharField(source='name')

    class Meta:
        model = SubProduct
        fields = ['id', 'subproductName', 'subcategoryId']

class SelectedSubProductSerializer(serializers.ModelSerializer):
    subproductId = serializers.PrimaryKeyRelatedField(
        queryset=SubProduct.objects.all(),
        source='subproduct'
    )

    class Meta:
        model = SelectedSubProduct
        fields = ['id', 'subproductId']
