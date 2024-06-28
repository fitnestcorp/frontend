'use client';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { Product } from '@/interfaces';
import { LogoLoader, ProductGrid } from '@/components';
import { useSearchProductsQuery } from '@/store';

interface SearchProductsProps {
    params: {
		keyword: string;
	};
  }
  
  const SearchProducts = ({ params }:SearchProductsProps) => {
    const keyword = params.keyword
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState<Product[]>([]);
  const [countProducts, setCountProducts] = useState(0);

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useSearchProductsQuery({ keyword, page, limit });

  useEffect(() => {
    if (productsData) {
      const [objectsList, totalCount] = productsData;
      setProducts(objectsList);
      setCountProducts(totalCount);
    } else if (productsError) {
      console.error('Error fetching products:', productsError);
    }
  }, [productsData, productsError]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (productsLoading) {
    return <LogoLoader />;
  }

  return (
    <Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 6,
          mb: 2,
        }}
      >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {`Productos de ${keyword}`}
        </Typography>
      </Box>

      <ProductGrid products={products} />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Pagination
          count={Math.ceil(countProducts / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default SearchProducts;
