resource "google_storage_bucket" "images" {
    name     = var.bucket_name
    location = "EU"
    force_destroy = true

    uniform_bucket_level_access = true

    lifecycle {
        prevent_destroy = false
    }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.images.name

  role    = "roles/storage.objectViewer"
  members = ["allUsers"]
}
