# Enable the Storage API
resource "google_project_service" "storage_api" {
  service = "storage.googleapis.com"
  disable_on_destroy = false
}

# Create a GCS bucket to store Terraform state
resource "google_storage_bucket" "terraform_state" {
  name     = "paragoniks-terraform-state"
  location = var.region
  force_destroy = false  # Set to false to prevent accidental deletion
  
  # Enable versioning to keep history of state files
  versioning {
    enabled = true
  }
  
  # Recommended settings for state buckets
  uniform_bucket_level_access = true
  
  depends_on = [
    google_project_service.storage_api
  ]
} 