'use client';
import { Box, Typography } from '@mui/material';
import { Banner, Breadcrumb, CategorySwiper } from '@/components';
import ProductGrid from '@/components/products/ProductGrid';
import { Category, Product } from '@/interfaces';
import { useEffect, useState } from 'react';
import { downloadImage } from '@/components/images/downloadImage';
import { useGetProductsByGroupQuery } from '@/store/services/productApi';
import { useGetGroupByNameQuery } from '@/store/services/groupApi';
import LogoLoader from '@/components/logo/LogoLoader';

interface Props {
  params: {
    grupo: string;
  };
}

export const GroupPage = ({ params }: Props) => {
  const { grupo } = params;
  const [objects, setObjects] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [count, setCount] = useState(0);
  const [filePath, setFilePath] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsByGroupQuery({ page: 1, limit: 10, group: grupo });
  const { data: groupsData, error: groupsError, isLoading: groupLoading } = useGetGroupByNameQuery(grupo);

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
        setCategories(groupsData.categories);
        const value = await downloadImage(groupsData.image_url);
        if (value) {
          setFilePath(URL.createObjectURL(value));
        }
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
    return <Typography>El grupo &quot;{grupo}&quot; no existe.</Typography>;
  }

  return (
    <Box>
      <Banner
        image={filePath}
        title={grupo}
      />
      <Breadcrumb />
      <CategorySwiper categories={categories} />
      <ProductGrid products={objects} />
    </Box>
  );
};

export default GroupPage;
