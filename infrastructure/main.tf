terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  
  backend "gcs" {
    # You'll need to create this bucket manually or use a different backend
    bucket = "paragoniks-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = "europe-west1"
}

resource "google_project_service" "secret_manager" {
  service = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

module "gcp" {
  source = "./modules"
  project_id = var.project_id
  git_hash = var.git_hash
  node_env = "production"
  primary_domain = "paragoniks.pl"
  cors_origin = "https://paragoniks.pl"
  bucket_name = "paragoniks-images"
}

variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "git_hash" {
  description = "The Git hash of the current commit"
  type        = string
}
