# Criando o banco de dados através da digital ocean

# resource "digitalocean_database_cluster" "db-cluster-passin" {
#   name       = "event-manager"
#   engine     = "pg"
#   version    = "15"
#   size       = "db-s-1vcpu-1gb"
#   region     = "nyc1"
#   node_count = 1
# }

# resource "digitalocean_database_db" "database-passin" {
#   cluster_id = digitalocean_database_cluster.db-cluster-passin.id
#   name       = "event-manager"

#   depends_on = [ 
#     digitalocean_database_cluster.db-cluster-passin
#    ]
# }


# Criando o banco de dados através da AWS, serviço RDS

data "aws_availability_zones" "available_zones" {

}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.13.0"

  name                 = "event-manager-vpc"
  cidr                 = "10.0.0.0/16"
  azs                  = data.aws_availability_zones.available_zones.names
  public_subnets       = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_db_subnet_group" "event_manager_db_subnet_group" {
  name       = "event-manager-db-subnet-group"
  subnet_ids = module.vpc.public_subnets

  tags = {
    Name = "event-manager-db-subnet-group"
  }
}

resource "aws_security_group" "rds" {
  name   = "event-manager-rds-security-group"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "event-manager-rds-security-group"
  }
}


resource "aws_db_parameter_group" "event_manager_db_parameter_group" {
  name   = "event-manager-db-parameter-group"
  family = "postgres16"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_db_instance" "event_manager_db" {
  identifier             = "event-manager-db"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "16.2"
  username               = "passinuserdb"
  password               = var.rds_db_password
  db_subnet_group_name   = aws_db_subnet_group.event_manager_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  parameter_group_name   = aws_db_parameter_group.event_manager_db_parameter_group.name
  publicly_accessible    = true
  skip_final_snapshot    = true
}