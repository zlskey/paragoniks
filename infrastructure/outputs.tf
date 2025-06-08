output "api_url" {
  value       = google_cloud_run_service.api.status[0].url
  description = "The URL of the deployed API service"
}

output "artifact_registry_repository" {
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.api_image_name}"
  description = "The Artifact Registry repository URL"
}

output "image_push_command" {
  value       = "docker push ${var.region}-docker.pkg.dev/${var.project_id}/${var.api_image_name}/${var.api_image_name}:latest"
  description = "Command to push a Docker image to the repository"
}

output "image_build_command" {
  value       = "docker build -t ${var.region}-docker.pkg.dev/${var.project_id}/${var.api_image_name}/${var.api_image_name}:latest -f ./api/docker/Dockerfile ./api"
  description = "Command to build the Docker image"
} 