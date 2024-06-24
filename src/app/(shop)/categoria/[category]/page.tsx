'use client';
import { Box, Typography } from '@mui/material';
import { Banner, Breadcrumb, CategorySwiper } from '@/components';
import ProductGrid from '@/components/products/ProductGrid';
import { Category, Product } from '@/interfaces';
import { useEffect, useState } from 'react';
import { downloadImage } from '@/components/images/downloadImage';
import { useGetProductsByCategoryQuery } from '@/store/services/productApi';
import { useGetCategoryByNameQuery } from '@/store/services/categoryApi';
import LogoLoader from '@/components/logo/LogoLoader';

interface Props {
  params: {
    category: string;
    group: string;
  };
}

export const CategoryPage = ({ params }: Props) => {
  const { group, category } = params;
  const [objects, setObjects] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [count, setCount] = useState(0);
  const [filePath, setFilePath] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [dataLoaded, setDataLoaded] = useState(false);

  const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsByCategoryQuery({ page: 1, limit: 10, category: category });
  const { data: groupsData, error: groupsError, isLoading: groupLoading } = useGetCategoryByNameQuery(category);

  useEffect(() => {
    if (productsData) {
      const products: Product[] = productsData[0];
      const totalCount: number = productsData[1];
      if (Array.isArray(products)) {
        setObjects(products);
        setCount(totalCount);
      } else {
        console.error('products is not an array:', products);
      }
    } else if (productsError) {
      console.error('Error fetching products:', productsError);
    }
  }, [productsData, productsError]);

  useEffect(() => {
    const fetchImage = async () => {
      if (groupsData && groupsData.image_url) {
        setName(groupsData.name)
        setImage(groupsData.image_url)
      }
      if (groupsError) {
        console.error('Error fetching groups:', groupsError);
      }
    };

    fetchImage();
  }, [groupsData, groupsError]);

  if (productsLoading || groupLoading) {
    return <LogoLoader />;
  }

  if (!groupsData || groupsError) {
    return <Typography>La categoría &quot;{category}&quot; no existe.</Typography>;
  }

  return (
    <Box>
      <Banner
        image={image}
        title={name}
      />
      <Breadcrumb />
      <ProductGrid products={objects} />
    </Box>
  );
};

export default CategoryPage;
