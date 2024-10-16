# product category lambda functions
data "aws_lambda_function" "product-attribute-find-all-lambda" {
  function_name = "${var.ENV}-api-product-attribute-find-all"
}

data "aws_lambda_function" "product-attribute-create-lambda" {
  function_name = "${var.ENV}-api-product-attribute-create"
}

data "aws_lambda_function" "product-attribute-update-lambda" {
  function_name = "${var.ENV}-api-product-attribute-update"
}

data "aws_lambda_function" "product-attribute-delete-lambda" {
  function_name = "${var.ENV}-api-product-attribute-delete"
}

data "aws_lambda_function" "product-attribute-find-one-lambda" {
  function_name = "${var.ENV}-api-product-attribute-find-one"
}

module "product-attribute" {
  source               = "../api-gateway-resource-template"
  api_id               = var.api_id
  api_execution_arn    = var.api_execution_arn
  root_resource_id     = var.root_resource_id
  authorizer_id        = var.authorizer_id
  ENV                  = var.ENV
  path_part            = "product-attribute"
  make_get_requests_public = false
  find_all_lambda_arn  = data.aws_lambda_function.product-attribute-find-all-lambda.invoke_arn
  find_one_lambda_arn  = data.aws_lambda_function.product-attribute-find-one-lambda.invoke_arn
  create_lambda_arn    = data.aws_lambda_function.product-attribute-create-lambda.invoke_arn
  update_lambda_arn    = data.aws_lambda_function.product-attribute-update-lambda.invoke_arn
  delete_lambda_arn    = data.aws_lambda_function.product-attribute-delete-lambda.invoke_arn
  find_all_lambda_name = data.aws_lambda_function.product-attribute-find-all-lambda.function_name
  find_one_lambda_name = data.aws_lambda_function.product-attribute-find-one-lambda.function_name
  create_lambda_name   = data.aws_lambda_function.product-attribute-create-lambda.function_name
  update_lambda_name   = data.aws_lambda_function.product-attribute-update-lambda.function_name
  delete_lambda_name   = data.aws_lambda_function.product-attribute-delete-lambda.function_name
}
