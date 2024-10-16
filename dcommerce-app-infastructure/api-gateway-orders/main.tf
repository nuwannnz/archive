# order lambda functions
data "aws_lambda_function" "order-find-all-lambda" {
  function_name = "${var.ENV}-api-order-find-all"
}

data "aws_lambda_function" "order-create-lambda" {
  function_name = "${var.ENV}-api-order-create"
}

data "aws_lambda_function" "order-update-lambda" {
  function_name = "${var.ENV}-api-order-update"
}

data "aws_lambda_function" "order-delete-lambda" {
  function_name = "${var.ENV}-api-order-delete"
}

data "aws_lambda_function" "order-find-one-lambda" {
  function_name = "${var.ENV}-api-order-find-one"
}

module "order" {
  source               = "../api-gateway-resource-template"
  api_id               = var.api_id
  api_execution_arn    = var.api_execution_arn
  root_resource_id     = var.root_resource_id
  authorizer_id        = var.authorizer_id
  ENV                  = var.ENV
  path_part            = "order"
  find_all_lambda_arn  = data.aws_lambda_function.order-find-all-lambda.invoke_arn
  find_one_lambda_arn  = data.aws_lambda_function.order-find-one-lambda.invoke_arn
  create_lambda_arn    = data.aws_lambda_function.order-create-lambda.invoke_arn
  update_lambda_arn    = data.aws_lambda_function.order-update-lambda.invoke_arn
  delete_lambda_arn    = data.aws_lambda_function.order-delete-lambda.invoke_arn
  find_all_lambda_name = data.aws_lambda_function.order-find-all-lambda.function_name
  find_one_lambda_name = data.aws_lambda_function.order-find-one-lambda.function_name
  create_lambda_name   = data.aws_lambda_function.order-create-lambda.function_name
  update_lambda_name   = data.aws_lambda_function.order-update-lambda.function_name
  delete_lambda_name   = data.aws_lambda_function.order-delete-lambda.function_name
}
