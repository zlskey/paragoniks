# Cloud Functions (Gen 2) deployment for Receipt Scanner using a container image

# Enable Cloud Functions API
resource "google_project_service" "cloud_functions" {
  service            = "cloudfunctions.googleapis.com"
  disable_on_destroy = false
}

# Gen 2 Cloud Function triggered by Pub/Sub topic "receipt-scanning"
resource "google_cloudfunctions2_function" "receipt_scanner" {
  name     = "receipt-scanner"
  location = "europe-west1"

  service_config {
    # Container image built and pushed by the CI pipeline
    # Use container image stored in Artifact Registry
    docker_repository      = "europe-west1-docker.pkg.dev/${var.project_id}/paragoniks-receipt-scanner/receipt-scanner"
    docker_registry        = "ARTIFACT_REGISTRY"
    service_account_email  = google_service_account.receipt_scanner_sa.email
    min_instance_count     = 0
    max_instance_count     = 1
    ingress_settings       = "ALLOW_INTERNAL_ONLY"
    environment_variables = {
      NODE_ENV = var.node_env
    }
  }

  event_trigger {
    trigger_region = "europe-west1"
    event_type     = "google.cloud.pubsub.topic.v1.messagePublished"
    pubsub_topic   = google_pubsub_topic.receipt_scanning.id
    retry_policy   = "RETRY_POLICY_RETRY"
  }

  depends_on = [
    google_project_service.cloud_functions,
  ]
}
