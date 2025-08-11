# Container Registry configuration
# Note: Google Container Registry (GCR) is used here
# This creates an Artifact Registry repository for Docker images

resource "google_project_service" "artifact_registry" {
  service = "containerregistry.googleapis.com"
}

resource "google_artifact_registry_repository" "api_repository" {
  depends_on = [google_project_service.artifact_registry]
  location = "europe-west1"
  repository_id = "paragoniks-api"
  description = "Docker repository for Paragoniks API images"
  format = "DOCKER"

  labels = {
    exposure = "external"
  }
}

# Artifact Registry repository for Receipt Scanner
resource "google_artifact_registry_repository" "receipt_scanner_repository" {
  depends_on = [google_project_service.artifact_registry]
  location      = "europe-west1"
  repository_id = "paragoniks-receipt-scanner"
  description   = "Docker repository for Receipt Scanner images"
  format        = "DOCKER"

  labels = {
    exposure = "internal"
  }
}
