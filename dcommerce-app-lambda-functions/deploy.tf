terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "dcommerce-terraform-state"
    key    = "terraform/lambda-functions"
    region = "ap-south-1"
  }
}

variable "ENV" {
  type        = string
  description = "Environment type"
  default     = "dev"
}
variable "SES_FROM_ADDRESS" {
  type        = string
  description = "Email for SES"
  default     = "admin@decimalapps.com"
}

variable "COGNITO_CLIENT_ID" {
  type        = string
  description = "Cognito user pool client id"
  default     = "1057nrlh1hfcoq00e82utho9aj"
}

variable "COGNITO_USER_POOL_ID" {
  type        = string
  description = "Cognito user pool client id"
  default     = "ap-south-1_Hf8KnCAZ3"
}

variable "DOMAIN_TABLE_NAME" {
  type        = string
  description = "Domain table name"
  default     = "dev-domain"
}

variable "USER_TABLE_NAME" {
  type        = string
  description = "User table name"
  default     = "dev-user"
}

variable "USER_ROLE_TABLE_NAME" {
  type        = string
  description = "User role table name"
  default     = "dev-user-role"
}

variable "CUSTOMER_USER_ROLE" {
  type        = string
  description = "customer user role id"
  default     = "640d4a544e4ee1e2be2e5042"
}

variable "CREATE_USER_LAMBDA_FUNC_NAME" {
  type        = string
  description = "Name of the create user lambda"
  default     = "dev-api-user-create"
}

variable "DB_USERNAME" {
  type        = string
  description = "Database username"
  default     = "dcommerce-dev"
}

variable "DB_PASSWORD" {
  type        = string
  description = "Database password"
  default     = "Sk980IewhKmnYRUl"
}


variable "API_GATEWAY_URL" {
  type        = string
  description = "API gateway url"
  default     = "https://ca9sw6a4ie.execute-api.ap-south-1.amazonaws.com/dev"
}

# Zip all the lambda functions
data "archive_file" "create-auth-challenge-trigger-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/create-auth-challange-trigger"
  output_path = "./dist/packages/${var.ENV}-create-auth-challenge-trigger.zip"
}
data "archive_file" "define-auth-challenge-trigger-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/define-auth-challenge-trigger"
  output_path = "./dist/packages/${var.ENV}-define-auth-challenge-trigger.zip"
}
data "archive_file" "post-authentication-trigger-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/post-authentication-trigger"
  output_path = "./dist/packages/${var.ENV}-post-authentication-trigger.zip"
}
data "archive_file" "pre-signup-trigger-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/pre-signup-trigger"
  output_path = "./dist/packages/${var.ENV}-pre-signup-trigger.zip"
}
data "archive_file" "verify-auth-challenge-response-trigger-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/verify-auth-challenge-response-trigger"
  output_path = "./dist/packages/${var.ENV}-verify-auth-challenge-response-trigger.zip"
}

data "archive_file" "api-gateway-authorizer-zip" {
  type        = "zip"
  source_dir  = "./dist/auth/api-gateway-authorizer"
  output_path = "./dist/packages/${var.ENV}-api-gateway-authorizer.zip"
}

# defined the S3 bucket for lambda functions
resource "aws_s3_bucket" "dcommerce-functions" {
  bucket = "dcommerce-api-functions"
}

# define ACL for the S3 bucket 
resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.dcommerce-functions.bucket
  acl    = "private"
}

# Upload each zipped function to S3
# etag is used to detect changes in zip files
resource "aws_s3_bucket_object" "dcommerce-function" {
  for_each = fileset("${path.module}/dist/packages", "**/*.zip")

  bucket = aws_s3_bucket.dcommerce-functions.bucket
  key    = each.value
  source = "${path.module}/dist/packages/${each.value}"
  etag   = filemd5("${path.module}/dist/packages/${each.value}")
}

data "aws_iam_role" "existing_iam_for_lambda" {
  name = "iam_for_lambda"
}

#ses policy for lambda
resource "aws_iam_policy" "ses_send_policy" {
  name = "ses_send_policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["ses:SendEmail"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_policy" "cognito_lambda_policy" {
  name = "cognito_lambda_policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["cognito-idp:AdminUpdateUserAttributes"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_policy" "cloudwatch_lambda_policy" {
  name = "lambda_logging"
  path = "/"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      },
    ]
  })
}

resource "aws_iam_policy" "lambda_invoke_policy" {
  name = "lambda_invoke"
  path = "/"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:InvokeFunction",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:lambda:*:*:*"
      },
    ]
  })
}

resource "aws_iam_policy" "dynamodb_lambda_policy" {
  name = "lambda_dynamodb"
  path = "/"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:dynamodb:*:*:*"
      },
    ]
  })
}

resource "aws_iam_role" "iam_for_lambda_triggers" {
  name_prefix = "iam_role_for_lambda_triggers"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    },
     {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }

  ]
}
EOF
  managed_policy_arns = [
    aws_iam_policy.ses_send_policy.arn,
    aws_iam_policy.cognito_lambda_policy.arn,
    aws_iam_policy.cloudwatch_lambda_policy.arn,
    aws_iam_policy.dynamodb_lambda_policy.arn,
    aws_iam_policy.lambda_invoke_policy.arn
  ]
}



# Define the lambda functions
resource "aws_lambda_function" "define_auth_challange_trigger" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  for_each = aws_s3_bucket_object.dcommerce-function

  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  s3_bucket     = aws_s3_bucket.dcommerce-functions.bucket
  s3_key        = each.key
  function_name = replace(each.key, ".zip", "")
  handler       = "index.handler"

  source_code_hash = base64sha256(each.value.etag)
  role             = aws_iam_role.iam_for_lambda_triggers.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      SES_FROM_ADDRESS             = var.SES_FROM_ADDRESS
      COGNITO_USER_POOL_ID         = var.COGNITO_USER_POOL_ID
      COGNITO_CLIENT_ID            = var.COGNITO_CLIENT_ID
      DOMAIN_TABLE_NAME            = var.DOMAIN_TABLE_NAME
      USER_TABLE_NAME              = var.USER_TABLE_NAME
      USER_ROLE_TABLE_NAME         = var.USER_ROLE_TABLE_NAME
      CUSTOMER_USER_ROLE           = var.CUSTOMER_USER_ROLE
      ENV                          = var.ENV
      API_GATEWAY_URL              = var.API_GATEWAY_URL
      CREATE_USER_LAMBDA_FUNC_NAME = var.CREATE_USER_LAMBDA_FUNC_NAME
      DB_USERNAME                  = var.DB_USERNAME
      DB_PASSWORD                  = var.DB_PASSWORD
    }
  }
}



