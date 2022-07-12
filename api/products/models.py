from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Subcategory"
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return self.name

class SubProduct(models.Model):
    name = models.CharField(max_length=50)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Subproduct"
        verbose_name_plural = "Subproducts"

    def __str__(self):
        return self.name


class SelectedSubProduct(models.Model):
    subproduct = models.ForeignKey(SubProduct, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Selected Subproduct"
        verbose_name_plural = "Selected Subproducts"

    def __str__(self):
        return self.subproduct.name
