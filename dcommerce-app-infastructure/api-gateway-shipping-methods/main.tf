# product category lambda functions
data "aws_lambda_function" "shipping-method-find-all-lambda" {
  function_name = "${var.ENV}-api-shipping-method-find-all"
}

data "aws_lambda_function" "shipping-method-create-lambda" {
  function_name = "${var.ENV}-api-shipping-method-create"
}

data "aws_lambda_function" "shipping-method-update-lambda" {
  function_name = "${var.ENV}-api-shipping-method-update"
}

data "aws_lambda_function" "shipping-method-delete-lambda" {
  function_name = "${var.ENV}-api-shipping-method-delete"
}

data "aws_lambda_function" "shipping-method-find-one-lambda" {
  function_name = "${var.ENV}-api-shipping-method-find-one"
}

module "shipping-method" {
  source               = "../api-gateway-resource-template"
  api_id               = var.api_id
  api_execution_arn    = var.api_execution_arn
  root_resource_id     = var.root_resource_id
  authorizer_id        = var.authorizer_id
  ENV                  = var.ENV
  path_part            = "shipping-method"
  make_get_requests_public = false
  find_all_lambda_arn  = data.aws_lambda_function.shipping-method-find-all-lambda.invoke_arn
  find_one_lambda_arn  = data.aws_lambda_function.shipping-method-find-one-lambda.invoke_arn
  create_lambda_arn    = data.aws_lambda_function.shipping-method-create-lambda.invoke_arn
  update_lambda_arn    = data.aws_lambda_function.shipping-method-update-lambda.invoke_arn
  delete_lambda_arn    = data.aws_lambda_function.shipping-method-delete-lambda.invoke_arn
  find_all_lambda_name = data.aws_lambda_function.shipping-method-find-all-lambda.function_name
  find_one_lambda_name = data.aws_lambda_function.shipping-method-find-one-lambda.function_name
  create_lambda_name   = data.aws_lambda_function.shipping-method-create-lambda.function_name
  update_lambda_name   = data.aws_lambda_function.shipping-method-update-lambda.function_name
  delete_lambda_name   = data.aws_lambda_function.shipping-method-delete-lambda.function_name
}
