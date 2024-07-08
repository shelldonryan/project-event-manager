terraform {
  required_providers {
     digitalocean = {
      source = "digitalocean/digitalocean"
      version = "2.39.2"
     }

     aws = {
      source = "hashicorp/aws"
      version = "5.57.0"
    }

    gcp = {
      source = "hashicorp/google"
      version = "5.36.0"
    }
  }
}

