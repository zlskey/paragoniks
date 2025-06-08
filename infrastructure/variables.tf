variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy resources"
  type        = string
  default     = "europe-west3"
}

variable "zone" {
  description = "The Google Cloud zone to deploy resources"
  type        = string
  default     = "europe-west3-a"
}

variable "api_image_name" {
  description = "The name of the API Docker image"
  type        = string
  default     = "paragoniks-api"
}

variable "api_service_name" {
  description = "The name of the Cloud Run service for the API"
  type        = string
  default     = "paragoniks-api"
}

# Environment variables for the API
variable "mongodb_url" {
  description = "MongoDB connection URL"
  type        = string
  sensitive   = true
}

variable "mongodb_root_username" {
  description = "MongoDB root username"
  type        = string
  sensitive   = true
}

variable "mongodb_root_password" {
  description = "MongoDB root password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Secret key for JWT token generation"
  type        = string
  sensitive   = true
}

variable "cors_origin" {
  description = "CORS origin for API"
  type        = string
  default     = "https://paragoniks.app"
}

variable "main_domain" {
  description = "Main domain for cookie settings"
  type        = string
  default     = "paragoniks.app"
}

variable "node_env" {
  description = "Node environment (development, production)"
  type        = string
  default     = "production"
}

variable "port" {
  description = "Port for the API server"
  type        = string
  default     = "8080"
}

variable "openai_api_key" {
  description = "OpenAI API key for AI features"
  type        = string
  sensitive   = true
} 