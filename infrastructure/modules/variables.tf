variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy resources"
  type        = string
  default     = "europe-west1"
}

variable "git_hash" {
  description = "The Git hash of the current commit"
  type        = string
}

variable "node_env" {
  description = "The environment to run the API in"
  type        = string
  default     = "production"
}

variable "primary_domain" {
  description = "The primary domain for the API"
  type        = string
}

variable "cors_origin" {
  description = "The CORS origin for the API"
  type        = string
}

variable "bucket_name" {
  description = "The name of the GCS bucket for storing images"
  type        = string
  default     = "paragoniks-images"
}
