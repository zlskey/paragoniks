# Create a GCS bucket to store Terraform state
resource "google_storage_bucket" "terraform_state" {
  name     = "paragoniks-terraform-state"
  location = var.region
  
  # Enable versioning to keep history of state files
  versioning {
    enabled = true
  }
  
  # Recommended settings for state buckets
  uniform_bucket_level_access = true
  
  # Optional settings for security
  force_destroy = false  # Set to true to delete the bucket with all objects

  depends_on = [
    google_project_service.storage_api
  ]
} 