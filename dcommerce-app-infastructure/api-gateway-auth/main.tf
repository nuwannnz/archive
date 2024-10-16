resource "aws_api_gateway_resource" "auth" {
  rest_api_id = var.api_id
  parent_id   = var.root_resource_id
  path_part   = "auth"
}

resource "aws_api_gateway_resource" "user" {
  rest_api_id = var.api_id
  parent_id   = aws_api_gateway_resource.auth.id
  path_part   = "user"
}

module "cors" {
  source          = "../cors"
  api_id          = var.api_id
  api_resource_id = aws_api_gateway_resource.auth.id
}

# GET:/user
resource "aws_api_gateway_method" "user-create" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.user.id
  http_method   = "POST"
  authorization = "NONE"

}

resource "aws_api_gateway_method_response" "auth-user-create-response-200" {
  rest_api_id = var.api_id
  resource_id = aws_api_gateway_resource.user.id
  http_method = aws_api_gateway_method.user-create.http_method
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

