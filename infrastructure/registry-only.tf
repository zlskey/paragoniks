terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Enable required API
resource "google_project_service" "container_registry" {
  service = "containerregistry.googleapis.com"
  disable_on_destroy = false
}

# Container Registry configuration
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