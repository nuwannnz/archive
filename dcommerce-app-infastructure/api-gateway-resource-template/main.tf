
resource "aws_api_gateway_resource" "user" {
  rest_api_id = var.api_id
  parent_id   = var.root_resource_id
  path_part   = var.path_part
}

resource "aws_api_gateway_resource" "users" {
  rest_api_id = var.api_id
  parent_id   = aws_api_gateway_resource.user.id
  path_part   = "{id}"
}

module "cors" {
  source          = "../cors"
  api_id          = var.api_id
  api_resource_id = aws_api_gateway_resource.user.id
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
  api_resource_id = aws_api_gateway_resource.users.id
  allow_headers = [
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key",
    "X-Domain"
  ]
}

# GET:/user
resource "aws_api_gateway_method" "user-find-all" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.user.id
  http_method   = "GET"
  authorization = var.make_get_requests_public == true ? "NONE" : "CUSTOM"
  authorizer_id = var.make_get_requests_public == true ? null : var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "user-find-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.user.id
  http_method             = aws_api_gateway_method.user-find-all.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.find_all_lambda_arn
}


# GET:/user/:id
resource "aws_api_gateway_method" "user-find-one" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "GET"
  authorization = var.make_get_requests_public == true ? "NONE" : "CUSTOM"
  authorizer_id = var.make_get_requests_public == true ? null : var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "user-find-one-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.users.id
  http_method             = aws_api_gateway_method.user-find-one.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.find_one_lambda_arn
}

# POST:/user
resource "aws_api_gateway_method" "user-create" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.user.id
  http_method   = "POST"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "user-create-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.user.id
  http_method             = aws_api_gateway_method.user-create.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.create_lambda_arn
}

# PUT:/user
resource "aws_api_gateway_method" "user-update" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "PUT"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "user-update-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.users.id
  http_method             = aws_api_gateway_method.user-update.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.update_lambda_arn
}

# DELETE:/user
resource "aws_api_gateway_method" "user-delete" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "DELETE"
  authorization = "CUSTOM"
  authorizer_id = var.authorizer_id

  request_parameters = {
    "method.request.path.proxy" = true,
  }
}

resource "aws_api_gateway_integration" "user-delete-integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.users.id
  http_method             = aws_api_gateway_method.user-delete.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.delete_lambda_arn
}

resource "aws_lambda_permission" "find_one_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.find_one_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "find_all_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.find_all_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "create_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.create_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "update_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.update_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}

resource "aws_lambda_permission" "delete_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.delete_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/*"
}
