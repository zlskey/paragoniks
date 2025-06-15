# Cloud Run service for the API

resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
}

resource "google_service_account" "cloudrun" {
  display_name = "Cloud Run Service Account"
  account_id = "cloudrun"
}

resource "google_cloud_run_service" "api" {
  name     = "paragoniks-api"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/${var.project_id}/paragoniks-api/paragoniks-api:latest"
        
        resources {
          limits = {
            cpu    = "1"
            memory = "256Mi"
          }
        }
        
        # Environment variables
        env {
          name  = "NODE_ENV"
          value = var.node_env
        }
        
        env {
          name  = "CORS_ORIGIN"
          value = var.cors_origin
        }
        
        env {
          name  = "MAIN_DOMAIN"
          value = var.primary_domain
        }
        # Secret environment variables
        env {
          name = "MONGODB_URL"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongo.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "MONGODB_ROOT_USERNAME"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongo_user.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "MONGODB_ROOT_PASSWORD"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongo_password.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "JWT_SECRET"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.jwt_secret.secret_id
              key  = "latest"
            }
          }
        }

        env {
          name = "OPENAI_API_KEY"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.openai_api_key.secret_id
              key  = "latest"
            }
          }
        }
      }
    }
    
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = "0"
        "autoscaling.knative.dev/maxScale" = "1"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_project_service.cloud_run,
    google_artifact_registry_repository.api_repository
  ]
}

# IAM policy to make the service publicly accessible
resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_service.api.location
  service  = google_cloud_run_service.api.name
  role     = "roles/run.invoker"
  member   = "allUsers"
} 
