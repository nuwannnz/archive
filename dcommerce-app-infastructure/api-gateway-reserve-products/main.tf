# reserve-products lambda functions


data "aws_lambda_function" "reserve-products-create-lambda" {
  function_name = "${var.ENV}-api-reserved-product-create"
}


resource "aws_api_gateway_resource" "reserve_products" {
  rest_api_id = var.api_id
  parent_id   = var.root_resource_id
  path_part   = "reserve-products"
}

module "cors" {
  source          = "../cors"
  api_id          = var.api_id
  api_resource_id = aws_api_gateway_resource.reserve_products.id
  allow_headers = [
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key",
    "X-Domain"
  ]
}


# POST:/reserve_products
resource "aws_api_gateway_method" "reserve_products-create" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.reserve_products.id
  http_method   = "POST"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "reserve_products-create-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.reserve_products.id
  http_method             = aws_api_gateway_method.reserve_products-create.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.reserve-products-create-lambda.invoke_arn
}


resource "aws_lambda_permission" "reserve-products-create-lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.reserve-products-create-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}