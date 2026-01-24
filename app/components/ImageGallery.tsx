"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails (Horizontal on mobile, Vertical on desktop) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${selectedImage === img ? 'border-black' : 'border-transparent'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`${name} view ${idx + 1}`}
                            fill
                            className="object-cover object-center"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 relative">
                <Image
                    src={selectedImage}
                    alt={name}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
        </div>
    );
}
