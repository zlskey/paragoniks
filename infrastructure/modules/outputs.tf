output "cloudrun_service_account_email" {
  value = google_service_account.cloudrun.email
}

output "functions_source_bucket_name" {
  value = google_storage_bucket.functions_source.name
}
