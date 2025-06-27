resource "google_storage_bucket" "images" {
    name     = var.bucket_name
    location = "EU"
    force_destroy = true

    uniform_bucket_level_access = true

    lifecycle {
        prevent_destroy = false
    }
}

resource "google_storage_bucket_iam_member" "cloudrun_access" {
    bucket = google_storage_bucket.images.name
    role   = "roles/storage.objectAdmin"
    member = "serviceAccount:${google_service_account.cloudrun.email}"
}

output "bucket_url" {
    value = "https://storage.googleapis.com/${google_storage_bucket.images.name}"
}