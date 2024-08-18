variable "AWS_ACCESS_KEY_ID" {
  type        = string
  description = "IAM acess key from AWS"
  sensitive   = true
}

variable "AWS_SECRET_ACCESS_KEY" {
  type        = string
  description = "IAM secret acess key from AWS"
  sensitive   = true
}

variable "AWS_REGION" {
  type        = string
  description = "Region from aws provider"
}

variable "rds_db_password" {
  type        = string
  description = "RDS root user password"
  sensitive   = true
}