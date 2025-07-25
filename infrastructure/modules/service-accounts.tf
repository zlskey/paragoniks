resource "google_service_account" "main_paragoniarz" {
  account_id   = "main-paragoniarz"
  display_name = "Main Paragoniarz"
}

resource "google_service_account" "side_paragoniarz" {
  account_id   = "side-paragoniarz"
  display_name = "Side Paragoniarz"
}

resource "google_project_iam_member" "main_pubsub_rw" {
  project = var.project_id
  role    = "roles/pubsub.editor"
  member  = "serviceAccount:${google_service_account.main_paragoniarz.email}"
}

resource "google_project_iam_member" "main_bucket_rw" {
  project = var.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.main_paragoniarz.email}"
}

resource "google_service_account_key" "main_paragoniarz_key" {
  service_account_id = google_service_account.main_paragoniarz.name
}

resource "google_secret_manager_secret_version" "main_paragoniarz_key" {
  depends_on = [google_project_service.secrets]
  secret = google_secret_manager_secret.gcp_main_paragoniarz_key.id
  secret_data = base64decode(google_service_account_key.main_paragoniarz_key.private_key)
}

resource "google_project_iam_member" "side_pubsub_rw" {
  project = var.project_id
  role    = "roles/pubsub.editor"
  member  = "serviceAccount:${google_service_account.side_paragoniarz.email}"
}

resource "google_project_iam_member" "side_bucket_r" {
  project = var.project_id
  role    = "roles/storage.objectViewer"
  member  = "serviceAccount:${google_service_account.side_paragoniarz.email}"
}

resource "google_service_account_key" "side_paragoniarz_key" {
  service_account_id = google_service_account.side_paragoniarz.name
}

resource "google_secret_manager_secret_version" "side_paragoniarz_key" {
  depends_on = [google_project_service.secrets]
  secret = google_secret_manager_secret.gcp_side_paragoniarz_key.id
  secret_data = base64decode(google_service_account_key.side_paragoniarz_key.private_key)
}