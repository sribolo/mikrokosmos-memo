import os

import cloudinary.uploader


def cloudinary_enabled():
    return bool(
        os.getenv("CLOUDINARY_URL")
        or (
            os.getenv("CLOUDINARY_CLOUD_NAME")
            and os.getenv("CLOUDINARY_API_KEY")
            and os.getenv("CLOUDINARY_API_SECRET")
        )
    )


def upload_image(file_obj, *, folder, public_id):
    if not cloudinary_enabled():
        raise RuntimeError("Cloudinary is not configured.")

    result = cloudinary.uploader.upload(
        file_obj,
        folder=folder,
        public_id=public_id,
        overwrite=True,
        resource_type="image",
    )
    return {
        "url": result.get("secure_url") or result.get("url") or "",
        "public_id": result.get("public_id") or "",
    }


def destroy_image(public_id):
    if not public_id or not cloudinary_enabled():
        return
    cloudinary.uploader.destroy(public_id, resource_type="image", invalidate=True)
