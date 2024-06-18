import supabase from "../../config/supabaseClient";

export async function downloadImage(imagePath: string){
    const { data, error } = await supabase.storage
        .from('product-image')
        .download(`public/${imagePath}`);

    if(error){
        console.error('Error al obtener la imagen ', error)
        return null;
    }
    return data;
}
