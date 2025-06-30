resource "google_project_service" "secrets" {
  service = "secretmanager.googleapis.com"
}

resource "google_secret_manager_secret" "mongo" {
  depends_on = [google_project_service.secrets]
  secret_id = "mongo_connection"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "mongo_user" {
  depends_on = [google_project_service.secrets]
  secret_id = "mongo_user"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "mongo_password" {
  depends_on = [google_project_service.secrets]
  secret_id = "mongo_password"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "jwt_secret" {
  depends_on = [google_project_service.secrets]
  secret_id = "jwt_secret"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "openai_api_key" {
  depends_on = [google_project_service.secrets]
  secret_id = "openai_api_key"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "gcp_main_paragoniarz_key" {
  depends_on = [google_project_service.secrets]
  secret_id = "gcp_main_paragoniarz_key"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret" "gcp_side_paragoniarz_key" {
  depends_on = [google_project_service.secrets]
  secret_id = "gcp_side_paragoniarz_key"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_mongo" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.mongo.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_mongo_user" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.mongo_user.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_mongo_password" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.mongo_password.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_jwt_secret" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.jwt_secret.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_openai_api_key" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.openai_api_key.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_gcp_main_paragoniarz_key" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.gcp_main_paragoniarz_key.id
}

resource "google_secret_manager_secret_iam_member" "cloudrun_service_account_to_gcp_side_paragoniarz_key" {
  member = "serviceAccount:${google_service_account.cloudrun.email}"
  role = "roles/secretmanager.secretAccessor"
  secret_id = google_secret_manager_secret.gcp_side_paragoniarz_key.id
}