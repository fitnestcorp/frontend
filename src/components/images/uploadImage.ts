import supabase from '../../config/supabaseClient';

export async function uploadImage(image: File) {
    const { data, error } = await supabase.storage
        .from('product-image')
        .upload(`public/${image.name}`, image);

    if (error) {
        console.error("Error details:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    return data;
}
