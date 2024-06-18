'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { downloadImage } from '../images/downloadImage';

interface ProductImageProps {
    url: string;
    title: string;
    height?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({ url, title, height = 14 }) => {
    const [filePath, setFilePath] = useState<string>("");

    useEffect(() => {
        async function fetchImage() {
            const value = await downloadImage(url);
            if (value) {
                setFilePath(URL.createObjectURL(value));
            }
        }
        fetchImage();
    }, [url]);

    return (
        <div className='max-h-[80vh] h-full bg-neutral-100 p-2 flex items-center justify-center'>
            {filePath ? (
                <Image 
                    alt={title} 
                    className='max-h-[90%] object-contain h-full' 
                    width={400} 
                    height={600} 
                    src={filePath} 
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductImage;
