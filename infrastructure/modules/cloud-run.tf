# Cloud Run service for the API

resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
}

resource "google_service_account" "cloudrun" {
  display_name = "Cloud Run Service Account"
  account_id = "cloudrun"
}

resource "google_cloud_run_service" "api" {
  name                        = "paragoniks-api"
  location                    = "europe-west1"
  autogenerate_revision_name = true

  depends_on = [
    google_project_service.cloud_run,
    google_artifact_registry_repository.api_repository
  ]

  template {
    
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = "0"
        "autoscaling.knative.dev/maxScale" = "1"
      }
    }
    
    spec {
      service_account_name = google_service_account.cloudrun.email
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

        env {
          name  = "BUCKET_NAME"
          value = var.bucket_name
        }

        env {
          name  = "PROJECT_ID"
          value = var.project_id
        }

        env {
          name = "GIT_HASH"
          value = var.git_hash
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

        env {
          name = "GOOGLE_SERVICE_ACCOUNT_KEY"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.gcp_main_paragoniarz_key.secret_id
              key  = "latest"
            }
          }
        }
        # Social auth envs from secrets
        env {
          name = "GOOGLE_WEB_CLIENT_ID"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.google_web_client_id.secret_id
              key  = "latest"
            }
          }
        }
        env {
          name = "GOOGLE_ANDROID_CLIENT_ID"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.google_android_client_id.secret_id
              key  = "latest"
            }
          }
        }
        env {
          name = "GOOGLE_IOS_CLIENT_ID"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.google_ios_client_id.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "PROTONMAIL_USER"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.protonmail_user.secret_id
              key  = "latest"
            }
          }
        }
        
        env {
          name = "PROTONMAIL_TOKEN"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.protonmail_token.secret_id
              key  = "latest"
            }
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# IAM policy to make the service publicly accessible
resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_service.api.location
  service  = google_cloud_run_service.api.name
  role     = "roles/run.invoker"
  member   = "allUsers"
} 
