resource "google_storage_bucket" "images" {
    name     = var.bucket_name
    location = "EU"
    force_destroy = true

    uniform_bucket_level_access = true

    lifecycle {
        prevent_destroy = false
    }
}

# Create a dedicated service account for bucket operations
resource "google_service_account" "bucket_service_account" {
  account_id   = "bucket-storage-sa"
  display_name = "Bucket Storage Service Account"
  description  = "Service account for read/write access to storage bucket"
}

# Grant the service account read/write access to this specific bucket
resource "google_storage_bucket_iam_member" "bucket_access" {
    bucket = google_storage_bucket.images.name
    role   = "roles/storage.objectAdmin"
    member = "serviceAccount:${google_service_account.bucket_service_account.email}"
}

# Create a service account key for the bucket service account
resource "google_service_account_key" "bucket_key" {
  service_account_id = google_service_account.bucket_service_account.name
}

# Store the service account key in Secret Manager
resource "google_secret_manager_secret" "gcp_service_account_key" {
  secret_id = "gcp-service-account-key"
  
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "gcp_service_account_key" {
  secret      = google_secret_manager_secret.gcp_service_account_key.id
  secret_data = base64decode(google_service_account_key.bucket_key.private_key)
}

output "bucket_url" {
    value = "https://storage.googleapis.com/${google_storage_bucket.images.name}"
}