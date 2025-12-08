"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GalleryDetail from "./GalleryDetail";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  return <GalleryDetail slug={slug} />;
}
