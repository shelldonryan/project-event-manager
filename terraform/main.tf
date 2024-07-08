resource "digitalocean_database_cluster" "db-cluster-passin" {
  name       = "event-manager"
  engine     = "pg"
  version    = "15"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1
}

resource "digitalocean_database_db" "database-passin" {
  cluster_id = digitalocean_database_cluster.db-cluster-passin.id
  name       = "event-manager"

  depends_on = [ 
    digitalocean_database_cluster.db-cluster-passin
   ]
}