# -----------------------------------------------------------------------------
# Variables: API Gateway /auth
# -----------------------------------------------------------------------------
# var.ENV
variable "ENV" {
  description = "Environment"
}

# var.api_id
variable "api_id" {
  description = "API identifier"
}

# var.api_role_arn
variable "api_role_arn" {
  description = "API role arn"
}

# var.root_resource_id
variable "root_resource_id" {
  description = "API root resource id"
}

# var.aws_region
variable "aws_region" {
  description = "AWS region"
}
