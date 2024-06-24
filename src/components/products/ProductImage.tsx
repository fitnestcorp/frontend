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
    console.log(url)
    return (
        <div className='w-full h-64 flex items-center justify-center bg-white p-4'>
           <Image 
                    alt={title} 
                    className='object-contain max-w-full max-h-full' 
                    width={256} 
                    height={256} 
                    src={url} 
                />
        </div>
    );
}

export default ProductImage;
