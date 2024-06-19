'use client';
import { Box } from '@mui/material';
import { Banner, Breadcrumb } from '@/components';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/interfaces';
import { useGetAGroupsQuery, useGetAllProductsQuery } from '@/store';
import { useEffect, useState } from 'react';
import { downloadImage } from '@/components/images/downloadImage';

interface Props {
	params: {
		name: string;
	};
}

export const GroupPage = ({ params }: Props) => {
	const { name } = params;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [objects, setObjects] = useState<Product[]>([]);
    const [count, setCount] = useState(0);
	const [filePath, setFilePath] = useState<string>("");

    // Consulta de productos
    const { data: productsData, error: productsError, isLoading: productsLoading } = useGetAllProductsQuery({ page, limit });

    // Consulta de grupos
    const { data: groupsData, error: groupsError, isLoading: groupsLoading } = useGetAGroupsQuery({ name });

    // Manejo de datos de productos
    useEffect(() => {
        if (productsData) {
            const [objectsList, totalCount] = productsData;
            console.log("Fetched products list: ", objectsList);
            setObjects(objectsList);
            setCount(totalCount);
        }
        if (productsError) {
            console.error('Error fetching products:', productsError);
        }
    }, [productsData, productsError]);

    // Manejo de datos de grupos y descarga de imágenes
    useEffect(() => {
        const fetchImage = async () => {
            if (groupsData) {
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

    // Mostrar cargando o error si es necesario
    if (productsLoading || groupsLoading) {
        return <div>Loading...</div>;
    }

	return (
		<Box>
			{groupsData && (
				<>
					<Banner
						image={filePath}
						title={name}
					/>
					<Breadcrumb />
					<ProductGrid products={objects} />
				</>
			)}
		</Box>
	);
};

export default GroupPage;
