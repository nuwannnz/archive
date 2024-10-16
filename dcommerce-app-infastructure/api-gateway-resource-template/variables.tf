# -----------------------------------------------------------------------------
# Variables: API Gateway
# -----------------------------------------------------------------------------
# var.ENV
variable "ENV" {
  description = "Environment"
}

# var.api_id
variable "api_id" {
  description = "API identifier"
}

# var.api_execution_arn
variable "api_execution_arn" {
  description = "API execution arn"
}

# var.root_resource_id
variable "root_resource_id" {
  description = "Root resource identifier"
}

# var.authorizer_id
variable "authorizer_id" {
  description = "Authorizer identifier"
}

# var.path_part
variable "path_part" {
  description = "Path part of this resource"
}

# var.find_all_lambda_arn
variable "find_all_lambda_arn" {
  description = "Find all lambda identification"
}

# var.find_one_lambda_arn
variable "find_one_lambda_arn" {
  description = "Find one lambda identification"
}


# var.create_lambda_arn
variable "create_lambda_arn" {
  description = "Create one lambda identification"
}


# var.update_lambda_arn
variable "update_lambda_arn" {
  description = "Update lambda identification"
}


# var.delete_lambda_arn
variable "delete_lambda_arn" {
  description = "Delete lambda identification"
}

variable "find_all_lambda_name" {
  description = "Find all lambda identification"
}

# var.find_one_lambda_arn
variable "find_one_lambda_name" {
  description = "Find one lambda identification"
}


# var.create_lambda_arn
variable "create_lambda_name" {
  description = "Create one lambda identification"
}


# var.update_lambda_arn
variable "update_lambda_name" {
  description = "Update lambda identification"
}


# var.delete_lambda_arn
variable "delete_lambda_name" {
  description = "Delete lambda identification"
}

variable "make_get_requests_public" {
  description = "Whether to make the get requests public or not"
  default     = true
}
