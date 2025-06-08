# Secret Manager for storing sensitive environment variables

# MongoDB URL secret
resource "google_secret_manager_secret" "mongodb_url" {
  secret_id = "mongodb-url"
  
  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
  
  depends_on = [
    google_project_service.secret_manager
  ]
}

resource "google_secret_manager_secret_version" "mongodb_url_version" {
  secret      = google_secret_manager_secret.mongodb_url.id
  secret_data = var.mongodb_url
}

# MongoDB root username
resource "google_secret_manager_secret" "mongodb_root_username" {
  secret_id = "mongodb-root-username"
  
  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
  
  depends_on = [
    google_project_service.secret_manager
  ]
}

resource "google_secret_manager_secret_version" "mongodb_root_username_version" {
  secret      = google_secret_manager_secret.mongodb_root_username.id
  secret_data = var.mongodb_root_username
}

# MongoDB root password
resource "google_secret_manager_secret" "mongodb_root_password" {
  secret_id = "mongodb-root-password"
  
  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
  
  depends_on = [
    google_project_service.secret_manager
  ]
}

resource "google_secret_manager_secret_version" "mongodb_root_password_version" {
  secret      = google_secret_manager_secret.mongodb_root_password.id
  secret_data = var.mongodb_root_password
}

# JWT Secret
resource "google_secret_manager_secret" "jwt_secret" {
  secret_id = "jwt-secret"
  
  replication {
    user_managed {
      replicas {
        location = var.region
      }
    }
  }
  
  depends_on = [
    google_project_service.secret_manager
  ]
}

resource "google_secret_manager_secret_version" "jwt_secret_version" {
  secret      = google_secret_manager_secret.jwt_secret.id
  secret_data = var.jwt_secret
} 