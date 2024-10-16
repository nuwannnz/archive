# cart-item lambda functions
data "aws_lambda_function" "cart-item-find-by-user-id-lambda" {
  function_name = "${var.ENV}-api-cart-item-find-by-user-id"
}

data "aws_lambda_function" "cart-item-create-lambda" {
  function_name = "${var.ENV}-api-cart-item-create"
}

data "aws_lambda_function" "cart-item-update-lambda" {
  function_name = "${var.ENV}-api-cart-item-update"
}

data "aws_lambda_function" "cart-item-delete-lambda" {
  function_name = "${var.ENV}-api-cart-item-delete"
}


resource "aws_api_gateway_resource" "cart_item" {
  rest_api_id = var.api_id
  parent_id   = var.root_resource_id
  path_part   = "cart-item"
}

resource "aws_api_gateway_resource" "cart_items" {
  rest_api_id = var.api_id
  parent_id   = aws_api_gateway_resource.cart_item.id
  path_part   = "{id}"
}

module "cors" {
  source          = "../cors"
  api_id          = var.api_id
  api_resource_id = aws_api_gateway_resource.cart_item.id
  allow_headers = [
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key",
    "X-Domain"
  ]
}

module "cors-sub" {
  source          = "../cors"
  api_id          = var.api_id
  api_resource_id = aws_api_gateway_resource.cart_items.id
  allow_headers = [
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key",
    "X-Domain"
  ]
}

# GET:/cart_item
resource "aws_api_gateway_method" "cart_item_find_cart_item_by_user_id" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.cart_item.id
  http_method   = "GET"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "cart_item-find-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.cart_item.id
  http_method             = aws_api_gateway_method.cart_item_find_cart_item_by_user_id.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.cart-item-find-by-user-id-lambda.invoke_arn
}


# POST:/cart_item
resource "aws_api_gateway_method" "cart_item-create" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.cart_item.id
  http_method   = "POST"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "cart_item-create-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.cart_item.id
  http_method             = aws_api_gateway_method.cart_item-create.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.cart-item-create-lambda.invoke_arn
}

# PUT:/cart_item
resource "aws_api_gateway_method" "cart_item-update" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.cart_items.id
  http_method   = "PUT"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "cart_item-update-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.cart_items.id
  http_method             = aws_api_gateway_method.cart_item-update.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.cart-item-update-lambda.invoke_arn
}

# DELETE:/cart_item
resource "aws_api_gateway_method" "cart_item-delete" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.cart_items.id
  http_method   = "DELETE"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "cart_item-delete-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.cart_items.id
  http_method             = aws_api_gateway_method.cart_item-delete.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = data.aws_lambda_function.cart-item-delete-lambda.invoke_arn
}

resource "aws_lambda_permission" "find_by_user_id_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.cart-item-find-by-user-id-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "create_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.cart-item-create-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "update_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.cart-item-update-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "delete_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.cart-item-delete-lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}
