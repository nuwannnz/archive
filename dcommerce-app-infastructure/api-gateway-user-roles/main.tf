# user role lambda functions
data "aws_lambda_function" "user-role-find-all-lambda" {
  function_name = "${var.ENV}-api-user-role-find-all"
}

data "aws_lambda_function" "user-role-create-lambda" {
  function_name = "${var.ENV}-api-user-role-create"
}

data "aws_lambda_function" "user-role-update-lambda" {
  function_name = "${var.ENV}-api-user-role-update"
}

data "aws_lambda_function" "user-role-delete-lambda" {
  function_name = "${var.ENV}-api-user-role-delete"
}

data "aws_lambda_function" "user-role-find-one-lambda" {
  function_name = "${var.ENV}-api-user-role-find-one"
}

module "user-role" {
  source               = "../api-gateway-resource-template"
  api_id               = var.api_id
  api_execution_arn    = var.api_execution_arn
  root_resource_id     = var.root_resource_id
  authorizer_id        = var.authorizer_id
  ENV                  = var.ENV
  path_part            = "user-role"
  make_get_requests_public = false
  find_all_lambda_arn  = data.aws_lambda_function.user-role-find-all-lambda.invoke_arn
  find_one_lambda_arn  = data.aws_lambda_function.user-role-find-one-lambda.invoke_arn
  create_lambda_arn    = data.aws_lambda_function.user-role-create-lambda.invoke_arn
  update_lambda_arn    = data.aws_lambda_function.user-role-update-lambda.invoke_arn
  delete_lambda_arn    = data.aws_lambda_function.user-role-delete-lambda.invoke_arn
  find_all_lambda_name = data.aws_lambda_function.user-role-find-all-lambda.function_name
  find_one_lambda_name = data.aws_lambda_function.user-role-find-one-lambda.function_name
  create_lambda_name   = data.aws_lambda_function.user-role-create-lambda.function_name
  update_lambda_name   = data.aws_lambda_function.user-role-update-lambda.function_name
  delete_lambda_name   = data.aws_lambda_function.user-role-delete-lambda.function_name
}
