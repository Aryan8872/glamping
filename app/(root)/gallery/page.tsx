"use cache"

import { motion } from "framer-motion";
import { Suspense } from "react";
import GalleryData from "./galleryData";


export default async function GalleryPage() {
  return (
    <section className="page-padding py-16">
    
      <Suspense fallback={<div>Loading...</div>}>
        <GalleryData/>
      </Suspense>
   
    </section>
  );
}
