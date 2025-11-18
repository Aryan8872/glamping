

import { getAllGallery } from '@/lib/api/gallery';
import GalleryGrid from './GalleryGrid';
const  GalleryData =async () => {
    const galleryData = await getAllGallery();
    return(
        <GalleryGrid galleryData={galleryData}/>
    )
}

export default GalleryData