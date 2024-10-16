terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "dcommerce-terraform-state"
    key    = "terraform/cognito"
    region = "ap-south-1"
  }
}

variable "ENV" {
  type        = string
  description = "Environment type"
  default     = "dev"
}

variable "REGION" {
  type        = string
  description = "AWS region"
  default     = "ap-south-1"
}

data "aws_lambda_function" "define-auth-challenge-trigger" {
  function_name = "${var.ENV}-define-auth-challenge-trigger"
}

data "aws_lambda_function" "create-auth-challenge-trigger" {
  function_name = "${var.ENV}-create-auth-challenge-trigger"
}

data "aws_lambda_function" "post-authentication-trigger" {
  function_name = "${var.ENV}-post-authentication-trigger"
}

data "aws_lambda_function" "pre-signup-trigger" {
  function_name = "${var.ENV}-pre-signup-trigger"
}

data "aws_lambda_function" "verify-auth-challenge-response-trigger" {
  function_name = "${var.ENV}-verify-auth-challenge-response-trigger"
}

# todo: add a env prefix to the resource names
resource "aws_cognito_user_pool" "dcommerce-users" {
  name                = "${var.ENV}-dcommerce-users"
  username_attributes = ["email"]
  password_policy {
    minimum_length    = 30
    require_uppercase = false
    require_symbols   = false
  }
  username_configuration {
    case_sensitive = false
  }

  # attributes 
  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "email"
    required            = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "userRole"
    required            = false
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
  schema {
    attribute_data_type = "String"
    mutable             = true
    name                = "userDomain"
    required            = false
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  schema {
    attribute_data_type = "String"
    mutable             = false
    name                = "userEmail"
    required            = false
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }


  lambda_config {
    create_auth_challenge          = data.aws_lambda_function.create-auth-challenge-trigger.arn
    define_auth_challenge          = data.aws_lambda_function.define-auth-challenge-trigger.arn
    post_authentication            = data.aws_lambda_function.post-authentication-trigger.arn
    verify_auth_challenge_response = data.aws_lambda_function.verify-auth-challenge-response-trigger.arn
    pre_sign_up                    = data.aws_lambda_function.pre-signup-trigger.arn
  }

}

resource "aws_lambda_permission" "pre-signup" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.pre-signup-trigger.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.dcommerce-users.arn
}

resource "aws_lambda_permission" "create-auth-challenge" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.create-auth-challenge-trigger.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.dcommerce-users.arn
}

resource "aws_lambda_permission" "define-auth-challenge" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.define-auth-challenge-trigger.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.dcommerce-users.arn
}
resource "aws_lambda_permission" "post-authentication" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.post-authentication-trigger.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.dcommerce-users.arn
}
resource "aws_lambda_permission" "verify-auth-challenge" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.verify-auth-challenge-response-trigger.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.dcommerce-users.arn
}

resource "aws_cognito_user_pool_client" "client" {

  name                                 = "${var.ENV}-dcommerce-client"
  user_pool_id                         = aws_cognito_user_pool.dcommerce-users.id
  callback_urls                        = ["http://localhost:3000"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid"]
  supported_identity_providers         = ["COGNITO"]
}

