resource "google_storage_bucket" "static-website" {
  name = "paragoniks-static-website"
  location = "europe-west1"
  force_destroy = true

  uniform_bucket_level_access = true
  public_access_prevention = "inherited"

  website {
    main_page_suffix = "index.html"
    not_found_page = "404.html"
  }

  cors {
    origin = [var.cors_origin]
    method = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_compute_backend_bucket" "static-website" {
  name = "paragoniks-static-website"
  bucket_name = google_storage_bucket.static-website.name
  enable_cdn = true
  compression_mode = "AUTOMATIC"
  
  cdn_policy {
    cache_mode = "CACHE_ALL_STATIC"
  }

  custom_response_headers = [
    "Strict-Transport-Security: max-age=31536000; includeSubDomains",
    "X-Content-Type-Options: nosniff",
    "X-Frame-Options: DENY",
    "X-XSS-Protection: 1; mode=block"
  ]
}

resource "google_compute_backend_bucket" "static-built-website" {
  name = "paragoniks-static-built-website"
  bucket_name = google_storage_bucket.static-website.name
  enable_cdn = true
  compression_mode = "AUTOMATIC"
  
  cdn_policy {
    cache_mode = "CACHE_ALL_STATIC"
  }

  custom_response_headers = [
    "Strict-Transport-Security: 31536000",
  ]
}

resource "google_storage_bucket_iam_member" "static-website" {
  bucket = google_storage_bucket.static-website.name
  member = "allUsers"
  role = "roles/storage.objectViewer"
}

resource "google_storage_bucket_object" "static-website" {
  name = "index.html"
  content_type = "text/html"
  cache_control = "public, max-age=31536000, immutable"
  bucket = google_storage_bucket.static-website.name
  content = <<-EOF
    <!DOCTYPE html>
    <html>
      <head>
        <title>Paragoniks</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <h1>Welcome to Paragoniks</h1>
        <p>This is a placeholder page. Please replace with your actual website content.</p>
      </body>
    </html>
  EOF
}