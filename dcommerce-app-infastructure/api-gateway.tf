
data "aws_lambda_function" "custom-authorizer" {
  function_name = "${var.ENV}-api-gateway-authorizer"
}

resource "aws_api_gateway_rest_api" "dcommerce-api-gw" {
  name        = "dcommerce-api-gw"
  description = "dcommerce API Gateway"
}

resource "aws_iam_role" "invocation_role" {
  name = "api_gateway_auth_invocation"
  path = "/"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "invocation_policy" {
  name = "default"
  role = aws_iam_role.invocation_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "lambda:InvokeFunction",
      "Effect": "Allow",
      "Resource": "${data.aws_lambda_function.custom-authorizer.arn}"
    }
  ]
}
EOF
}

resource "aws_api_gateway_authorizer" "api_authorizer" {
  name                             = "CustomAuthorizer"
  type                             = "REQUEST"
  rest_api_id                      = aws_api_gateway_rest_api.dcommerce-api-gw.id
  authorizer_uri                   = data.aws_lambda_function.custom-authorizer.invoke_arn
  authorizer_credentials           = aws_iam_role.invocation_role.arn
  authorizer_result_ttl_in_seconds = 0

}
module "domains" {
  source            = "./api-gateway-domains"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "user-roles" {
  source            = "./api-gateway-user-roles"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "users" {
  source            = "./api-gateway-users"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "product-categories" {
  source            = "./api-gateway-product-categories"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "products" {
  source            = "./api-gateway-products"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "auth" {
  source           = "./api-gateway-auth"
  api_id           = aws_api_gateway_rest_api.dcommerce-api-gw.id
  aws_region       = var.REGION
  api_role_arn     = aws_iam_role.invocation_role.arn
  ENV              = var.ENV
  root_resource_id = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
}

module "cart-items" {
  source            = "./api-gateway-cart-items"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "product-attributes" {
  source            = "./api-gateway-product-attributes"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "reserve-products" {
  source            = "./api-gateway-reserve-products"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}

module "shipping-methods" {
  source            = "./api-gateway-shipping-methods"
  api_id            = aws_api_gateway_rest_api.dcommerce-api-gw.id
  api_execution_arn = aws_api_gateway_rest_api.dcommerce-api-gw.execution_arn
  root_resource_id  = aws_api_gateway_rest_api.dcommerce-api-gw.root_resource_id
  authorizer_id     = aws_api_gateway_authorizer.api_authorizer.id
  ENV               = var.ENV
}
