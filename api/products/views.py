from .models import Product, SubCategory, SubProduct, SelectedSubProduct
from rest_framework import viewsets
from .serializers import ProductSerializer, SubCategorySerializer, SubProductSerializer, SelectedSubProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer
    # remove to force authentication to access API
    # permission_classes = [permissions.IsAuthenticated]


class SubCategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Subcategories to be viewed or edited.
    """
    queryset = SubCategory.objects.all().order_by('name')
    serializer_class = SubCategorySerializer
    # remove to force authentication to access API
    # permission_classes = [permissions.IsAuthenticated]


class SubProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Subproduct to be viewed or edited.
    """
    queryset = SubProduct.objects.all().order_by('name')
    serializer_class = SubProductSerializer
    # remove to force authentication to access API
    # permission_classes = [permissions.IsAuthenticated]

class SelectedSubProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows SelectedSubproduct to be viewed or edited.
    """
    queryset = SelectedSubProduct.objects.all()
    serializer_class = SelectedSubProductSerializer
    # remove to force authentication to access API
    # permission_classes = [permissions.IsAuthenticated]