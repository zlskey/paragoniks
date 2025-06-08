# Cloud Run service for the API

resource "google_cloud_run_service" "api" {
  name     = var.api_service_name
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.api_image_name}/${var.api_image_name}:latest"
        
        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
        
        # Environment variables
        env {
          name  = "NODE_ENV"
          value = var.node_env
        }
        
        env {
          name  = "PORT"
          value = var.port
        }
        
        env {
          name  = "CORS_ORIGIN"
          value = var.cors_origin
        }
        
        env {
          name  = "MAIN_DOMAIN"
          value = var.main_domain
        }
        
        # Secret environment variables
        env {
          name = "MONGODB_URL"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongodb_url.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "MONGODB_ROOT_USERNAME"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongodb_root_username.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "MONGODB_ROOT_PASSWORD"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.mongodb_root_password.secret_id
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
    google_artifact_registry_repository.api_repository,
    google_secret_manager_secret_version.mongodb_url_version,
    google_secret_manager_secret_version.mongodb_root_username_version,
    google_secret_manager_secret_version.mongodb_root_password_version,
    google_secret_manager_secret_version.jwt_secret_version
  ]
}

# IAM policy to make the service publicly accessible
resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_service.api.location
  service  = google_cloud_run_service.api.name
  role     = "roles/run.invoker"
  member   = "allUsers"
} 