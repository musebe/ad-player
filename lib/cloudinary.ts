// lib/cloudinary.ts

export function getCloudinaryVideoUrl(publicId: string) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName || !publicId) {
        return '';
    }

    return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
}
