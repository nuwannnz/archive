

# user lambda functions
data "aws_lambda_function" "user-find-all-lambda" {
  function_name = "${var.ENV}-api-user-find-all"
}

data "aws_lambda_function" "user-create-lambda" {
  function_name = "${var.ENV}-api-user-create"
}

data "aws_lambda_function" "user-update-lambda" {
  function_name = "${var.ENV}-api-user-update"
}

data "aws_lambda_function" "user-delete-lambda" {
  function_name = "${var.ENV}-api-user-delete"
}

data "aws_lambda_function" "user-find-one-lambda" {
  function_name = "${var.ENV}-api-user-find-one"
}

module "user" {
  source                   = "../api-gateway-resource-template"
  api_id                   = var.api_id
  api_execution_arn        = var.api_execution_arn
  root_resource_id         = var.root_resource_id
  authorizer_id            = var.authorizer_id
  ENV                      = var.ENV
  path_part                = "user"
  make_get_requests_public = false
  find_all_lambda_arn      = data.aws_lambda_function.user-find-all-lambda.invoke_arn
  find_one_lambda_arn      = data.aws_lambda_function.user-find-one-lambda.invoke_arn
  create_lambda_arn        = data.aws_lambda_function.user-create-lambda.invoke_arn
  update_lambda_arn        = data.aws_lambda_function.user-update-lambda.invoke_arn
  delete_lambda_arn        = data.aws_lambda_function.user-delete-lambda.invoke_arn
  find_all_lambda_name     = data.aws_lambda_function.user-find-all-lambda.function_name
  find_one_lambda_name     = data.aws_lambda_function.user-find-one-lambda.function_name
  create_lambda_name       = data.aws_lambda_function.user-create-lambda.function_name
  update_lambda_name       = data.aws_lambda_function.user-update-lambda.function_name
  delete_lambda_name       = data.aws_lambda_function.user-delete-lambda.function_name
}
