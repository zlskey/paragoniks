# Container Registry configuration
# Note: Google Container Registry (GCR) is used here
# This creates an Artifact Registry repository for Docker images

resource "google_artifact_registry_repository" "api_repository" {
  provider = google
  
  location      = var.region
  repository_id = var.api_image_name
  description   = "Docker repository for Paragoniks API images"
  format        = "DOCKER"

  depends_on = [
    google_project_service.container_registry
  ]
} 