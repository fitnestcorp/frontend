'use client';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { Product } from '@/interfaces';
import { LogoLoader, ProductGrid, Banner } from '@/components';
import { useSearchProductsQuery } from '@/store';
import { useSearchParams} from 'next/navigation';

interface SearchProductsProps {
    params: {
		keyword: string;
	};
  }
  
  const SearchProducts: React.FC<SearchProductsProps> = ({ params }:SearchProductsProps) => {
    
    const searchParams = useSearchParams();
    const querySearchParam = searchParams.get('query');
    console.log(querySearchParam);

    // Proveer un valor por defecto cuando querySearchParam es null
    const keyword = querySearchParam || "";
    
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
    <>
        <Banner image={'https://fitnest-bucket.s3.amazonaws.com/pexels-leonardho-1552242.jpg'} title={`Fitnest`} />	
        <Box sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
            <div className="flex align-middle items-center ">
                <h2 className="font-bold text-3xl">Busqueda por:</h2>
                <p className="text-lg pl-2">{querySearchParam}</p> 
            </div>
            
            {productsData && productsData[0].length === 0 ? (
                <p className= "pt-10 pb-40 font-light">No se encontraron productos con tal descripción :( </p>
            ) : (
                <>
                    <ProductGrid products={products} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Pagination
                        count={Math.ceil(countProducts / limit)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                    </Box>
                </>
            )}

        </Box>
    </>
  );
};

export default SearchProducts;
