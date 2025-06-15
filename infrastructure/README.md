# Infrastructure for Paragoniks API

This directory contains Terraform configuration to set up the infrastructure for the Paragoniks API on Google Cloud Platform.

## Resources Created

- Google Artifact Registry repository for Docker images
- Google Cloud Run service for running the API
- Google Secret Manager secrets for environment variables

## Prerequisites

1. [Terraform](https://www.terraform.io/downloads.html) installed (v1.0.0+)
2. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
3. Google Cloud project created
4. Service account with appropriate permissions
5. Google Cloud Storage bucket for Terraform state (or modify backend configuration)

## Setup

1. Authenticate with Google Cloud:
   ```
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. Create a `terraform.tfvars` file with your values:
   ```hcl
   project_id              = "your-gcp-project-id"
   region                  = "europe-west1"
   mongodb_url             = "mongodb://username:password@host:port/db?options"
   mongodb_root_username   = "root_username"
   mongodb_root_password   = "root_password"
   jwt_secret              = "your_jwt_secret"
   cors_origin             = "https://your-frontend-domain.com"
   main_domain             = "your-domain.com"
   ```

3. Initialize Terraform:
   ```
   terraform init
   ```

4. Apply the configuration:
   ```
   terraform plan    # Review the changes
   terraform apply   # Apply the changes
   ```

## Deploying the API

After the infrastructure is set up:

1. Build the Docker image:
   ```
   docker build -t REGION-docker.pkg.dev/PROJECT_ID/paragoniks-api/paragoniks-api:latest -f ./api/docker/Dockerfile ./api
   ```

2. Configure Docker for Google Artifact Registry:
   ```
   gcloud auth configure-docker REGION-docker.pkg.dev
   ```

3. Push the image:
   ```
   docker push REGION-docker.pkg.dev/PROJECT_ID/paragoniks-api/paragoniks-api:latest
   ```

Cloud Run will automatically deploy the new image.

## Clean Up

To destroy all resources created by Terraform:

```
terraform destroy
``` 