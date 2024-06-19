import supabase from "../../config/supabaseClient";

export async function downloadImage(imagePath: string): Promise<Blob | null> {
    const cacheName = 'image-cache-v1';
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(imagePath);

    if (cachedResponse) {
        console.log("cache")
        return cachedResponse.blob();
    } else {
        console.log("descarga")
        const { data, error } = await supabase.storage
            .from('product-image')
            .download(`public/${imagePath}`);

        if (error) {
            console.error('Error downloading image:', error);
            return null;
        }

        const responseToCache = new Response(data, {
            headers: { 'Content-Type': data.type }
        });
        await cache.put(imagePath, responseToCache.clone());
        return data;
    }
}
