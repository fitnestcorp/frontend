'use client';
import { Box } from '@mui/material';
import { Banner, Breadcrumb } from '@/components';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/interfaces';
import { useEffect, useState } from 'react';
import { downloadImage } from '@/components/images/downloadImage';
import { useGetProductsByGroupQuery } from '@/store/services/productApi';
import { useGetGroupByNameQuery } from '@/store/services/groupApi';

interface Props {
    params: {
        name: string;
    };
}

export const GroupPage = ({ params }: Props) => {
    const { name } = params;
    const [objects, setObjects] = useState<Product[]>([]);
    const [count, setCount] = useState(0);
    const [filePath, setFilePath] = useState<string>("");
    const [dataLoaded, setDataLoaded] = useState(false);

    const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsByGroupQuery({ page: 1, limit: 10, group: name });
    const { data: groupsData, error: groupsError, isLoading:  groupLoading } = useGetGroupByNameQuery(name);

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


    return (
        <Box>
            <Banner
                image={filePath}
                title={name}
            />
            <Breadcrumb />
            <ProductGrid products={objects} />
        </Box>
    );
};

export default GroupPage;
