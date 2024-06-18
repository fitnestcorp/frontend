
'use client'
import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import { uploadImage } from '../images/uploadImage';
import { User } from '@supabase/supabase-js';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const authenticateUser = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: 'anasofia.a024@gmail.com',
                password: 'Seguridad-Media2024'
            });

            if (error) {
                console.error('Error authenticating user:', error);
            } else {
                setUser(data.user);
                console.log('User authenticated:', data.user);
            }
        };

        authenticateUser();
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
            console.log('Selected image:', event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            setUploadStatus('No image selected.');
            console.log('No image selected.');
            return;
        }

        

        setUploadStatus('Uploading...');
        console.log('Uploading image:', selectedImage);

        try {
            const data = await uploadImage(selectedImage);
            setUploadStatus('Upload successful!');
            console.log('Uploaded data:', data);
        } catch (error) {
            setUploadStatus(`Upload failed: ${error}`);
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUploader;
