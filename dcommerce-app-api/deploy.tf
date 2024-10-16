terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "dcommerce-terraform-state"
    key    = "terraform/api"
    region = "ap-south-1"
  }
}

variable "ENV" {
  type        = string
  description = "Environment type"
  default     = "dev"
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

variable "PRODUCT_IMAGE_S3_BUCKET" {
  type        = string
  description = "S3 bucket name for uploading product images"
  default     = "dev-dcommerce-product-images"
}

# Zip all the lambda functions
data "archive_file" "domain-find-all" {
  type        = "zip"
  source_file = "./dist/domain/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-domain-find-all.zip"
}
data "archive_file" "domain-find-one" {
  type        = "zip"
  source_file = "./dist/domain/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-domain-find-one.zip"
}
data "archive_file" "domain-create" {
  type        = "zip"
  source_file = "./dist/domain/create.js"
  output_path = "./dist/packages/${var.ENV}-api-domain-create.zip"
}
data "archive_file" "domain-update" {
  type        = "zip"
  source_file = "./dist/domain/update.js"
  output_path = "./dist/packages/${var.ENV}-api-domain-update.zip"
}
data "archive_file" "domain-delete" {
  type        = "zip"
  source_file = "./dist/domain/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-domain-delete.zip"
}
data "archive_file" "user-role-find-all" {
  type        = "zip"
  source_file = "./dist/user-role/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-user-role-find-all.zip"
}
data "archive_file" "user-role-find-one" {
  type        = "zip"
  source_file = "./dist/user-role/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-user-role-find-one.zip"
}
data "archive_file" "user-role-create" {
  type        = "zip"
  source_file = "./dist/user-role/create.js"
  output_path = "./dist/packages/${var.ENV}-api-user-role-create.zip"
}
data "archive_file" "user-role-update" {
  type        = "zip"
  source_file = "./dist/user-role/update.js"
  output_path = "./dist/packages/${var.ENV}-api-user-role-update.zip"
}
data "archive_file" "user-role-delete" {
  type        = "zip"
  source_file = "./dist/user-role/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-user-role-delete.zip"
}
data "archive_file" "user-find-all" {
  type        = "zip"
  source_file = "./dist/user/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-user-find-all.zip"
}
data "archive_file" "user-find-one" {
  type        = "zip"
  source_file = "./dist/user/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-user-find-one.zip"
}
data "archive_file" "user-create" {
  type        = "zip"
  source_file = "./dist/user/create.js"
  output_path = "./dist/packages/${var.ENV}-api-user-create.zip"
}
data "archive_file" "user-update" {
  type        = "zip"
  source_file = "./dist/user/update.js"
  output_path = "./dist/packages/${var.ENV}-api-user-update.zip"
}
data "archive_file" "user-delete" {
  type        = "zip"
  source_file = "./dist/user/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-user-delete.zip"
}

data "archive_file" "product-category-find-all" {
  type        = "zip"
  source_file = "./dist/product-category/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-product-category-find-all.zip"
}
data "archive_file" "product-category-find-one" {
  type        = "zip"
  source_file = "./dist/product-category/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-product-category-find-one.zip"
}
data "archive_file" "product-category-create" {
  type        = "zip"
  source_file = "./dist/product-category/create.js"
  output_path = "./dist/packages/${var.ENV}-api-product-category-create.zip"
}
data "archive_file" "product-category-update" {
  type        = "zip"
  source_file = "./dist/product-category/update.js"
  output_path = "./dist/packages/${var.ENV}-api-product-category-update.zip"
}
data "archive_file" "product-category-delete" {
  type        = "zip"
  source_file = "./dist/product-category/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-product-category-delete.zip"
}

data "archive_file" "product-find-all" {
  type        = "zip"
  source_file = "./dist/product/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-product-find-all.zip"
}
data "archive_file" "product-find-one" {
  type        = "zip"
  source_file = "./dist/product/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-product-find-one.zip"
}
data "archive_file" "product-create" {
  type        = "zip"
  source_file = "./dist/product/create.js"
  output_path = "./dist/packages/${var.ENV}-api-product-create.zip"
}
data "archive_file" "product-update" {
  type        = "zip"
  source_file = "./dist/product/update.js"
  output_path = "./dist/packages/${var.ENV}-api-product-update.zip"
}
data "archive_file" "product-delete" {
  type        = "zip"
  source_file = "./dist/product/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-product-delete.zip"
}

# cart-item zip archives
data "archive_file" "cart-item-find-by-user-id" {
  type        = "zip"
  source_file = "./dist/cart-item/find-by-user-id.js"
  output_path = "./dist/packages/${var.ENV}-api-cart-item-find-by-user-id.zip"
}
data "archive_file" "cart-item-create" {
  type        = "zip"
  source_file = "./dist/cart-item/create.js"
  output_path = "./dist/packages/${var.ENV}-api-cart-item-create.zip"
}
data "archive_file" "cart-item-update" {
  type        = "zip"
  source_file = "./dist/cart-item/update.js"
  output_path = "./dist/packages/${var.ENV}-api-cart-item-update.zip"
}
data "archive_file" "cart-item-delete" {
  type        = "zip"
  source_file = "./dist/cart-item/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-cart-item-delete.zip"
}

# product-attibute zip archives
data "archive_file" "product-attribute-find-all" {
  type        = "zip"
  source_file = "./dist/product-attribute/find-all.js"
  output_path = "./dist/packages/${var.ENV}-api-product-attribute-find-all.zip"
}
data "archive_file" "product-attribute-find-one" {
  type        = "zip"
  source_file = "./dist/product-attribute/find-one.js"
  output_path = "./dist/packages/${var.ENV}-api-product-attribute-find-one.zip"
}
data "archive_file" "product-attribute-create" {
  type        = "zip"
  source_file = "./dist/product-attribute/create.js"
  output_path = "./dist/packages/${var.ENV}-api-product-attribute-create.zip"
}
data "archive_file" "product-attribute-update" {
  type        = "zip"
  source_file = "./dist/product-attribute/update.js"
  output_path = "./dist/packages/${var.ENV}-api-product-attribute-update.zip"
}
data "archive_file" "product-attribute-delete" {
  type        = "zip"
  source_file = "./dist/product-attribute/delete.js"
  output_path = "./dist/packages/${var.ENV}-api-product-attribute-delete.zip"
}

# reserve-product zip archives
data "archive_file" "reserved-product-create" {
  type        = "zip"
  source_file = "./dist/reserved-product/create.js"
  output_path = "./dist/packages/${var.ENV}-api-reserved-product-create.zip"
}

data "archive_file" "sharp-layer" {
  type        = "zip"
  source_dir  = "./src/layers/sharp"
  output_path = "./dist/layers/${var.ENV}-sharp-layer.zip"
}

# defined the S3 bucket for lambda functions
data "aws_s3_bucket" "dcommerce-functions" {
  bucket = "dcommerce-api-functions"
}

# Upload each zipped function to S3
# etag is used to detect changes in zip files
resource "aws_s3_bucket_object" "dcommerce-function" {
  for_each = fileset("${path.module}/dist/packages", "**/*.zip")

  bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  key    = each.value
  source = "${path.module}/dist/packages/${each.value}"
  etag   = filemd5("${path.module}/dist/packages/${each.value}")
}

resource "aws_s3_bucket_object" "sharp-layer-s3-object" {
  bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  key    = "${var.ENV}-sharp-layer.zip"
  source = "${path.module}/dist/layers/${var.ENV}-sharp-layer.zip"
  etag   = filemd5("${path.module}/dist/layers/${var.ENV}-sharp-layer.zip")
}

resource "aws_lambda_layer_version" "sharp_lambda_layer" {
  s3_bucket           = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key              = aws_s3_bucket_object.sharp-layer-s3-object.key
  s3_object_version   = aws_s3_bucket_object.sharp-layer-s3-object.version_id
  layer_name          = "sharp_lambda_layer"
  compatible_runtimes = ["nodejs16.x", "nodejs18.x"]
}

data "aws_iam_role" "existing_iam_for_lambda" {
  name = "iam_for_lambda"
}

resource "aws_iam_policy" "s3_policy" {
  name = "s3_policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:*"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}


resource "aws_iam_policy" "cloudwatch_lambda_policy" {
  name = "api_lambda_logging"
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

resource "aws_iam_policy" "dynamodb_policy" {
  name = "dynamodb_policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["dynamodb:*"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role" "iam_for_api_lambda" {
  name_prefix = "iam_role_for_api_lambda"

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
    aws_iam_policy.dynamodb_policy.arn,
    aws_iam_policy.cloudwatch_lambda_policy.arn,
    aws_iam_policy.s3_policy.arn
  ]
}

# Define the lambda functions

resource "aws_lambda_function" "domain-find-all" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-domain-find-all.zip"
  function_name    = "${var.ENV}-api-domain-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-domain-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "domain-find-one" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-domain-find-one.zip"
  function_name    = "${var.ENV}-api-domain-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-domain-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "domain-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-domain-create.zip"
  function_name    = "${var.ENV}-api-domain-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-domain-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "domain-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-domain-update.zip"
  function_name    = "${var.ENV}-api-domain-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-domain-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "domain-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-domain-delete.zip"
  function_name    = "${var.ENV}-api-domain-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-domain-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-role-find-all" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-user-role-find-all.zip"
  function_name    = "${var.ENV}-api-user-role-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-role-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-role-find-one" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-user-role-find-one.zip"
  function_name    = "${var.ENV}-api-user-role-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-role-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-role-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-user-role-create.zip"
  function_name    = "${var.ENV}-api-user-role-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-role-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-role-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-user-role-update.zip"
  function_name    = "${var.ENV}-api-user-role-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-role-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-role-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-user-role-delete.zip"
  function_name    = "${var.ENV}-api-user-role-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-role-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-find-all" {
  s3_bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_key           = "${var.ENV}-api-user-find-all.zip"
  function_name    = "${var.ENV}-api-user-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-find-one" {
  s3_bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_key           = "${var.ENV}-api-user-find-one.zip"
  function_name    = "${var.ENV}-api-user-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "user-create" {
  s3_bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_key           = "${var.ENV}-api-user-create.zip"
  function_name    = "${var.ENV}-api-user-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "user-update" {
  s3_bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_key           = "${var.ENV}-api-user-update.zip"
  function_name    = "${var.ENV}-api-user-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "user-delete" {
  s3_bucket = data.aws_s3_bucket.dcommerce-functions.bucket
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_key           = "${var.ENV}-api-user-delete.zip"
  function_name    = "${var.ENV}-api-user-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-user-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-category-find-all" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-category-find-all.zip"
  function_name    = "${var.ENV}-api-product-category-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-category-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-category-find-one" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-category-find-one.zip"
  function_name    = "${var.ENV}-api-product-category-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-category-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "product-category-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-category-create.zip"
  function_name    = "${var.ENV}-api-product-category-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-category-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-category-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-category-update.zip"
  function_name    = "${var.ENV}-api-product-category-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-category-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "product-category-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-category-delete.zip"
  function_name    = "${var.ENV}-api-product-category-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-category-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-find-all" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-find-all.zip"
  function_name    = "${var.ENV}-api-product-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-find-one" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-find-one.zip"
  function_name    = "${var.ENV}-api-product-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "product-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function,
    aws_lambda_layer_version.sharp_lambda_layer
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-create.zip"
  function_name    = "${var.ENV}-api-product-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  timeout          = 20
  layers           = [aws_lambda_layer_version.sharp_lambda_layer.arn]
  environment {
    variables = {
      TABLE_PREFIX            = var.ENV
      DB_USERNAME             = var.DB_USERNAME
      DB_PASSWORD             = var.DB_PASSWORD
      PRODUCT_IMAGE_S3_BUCKET = var.PRODUCT_IMAGE_S3_BUCKET
    }
  }
}

resource "aws_lambda_function" "product-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function,
    aws_lambda_layer_version.sharp_lambda_layer
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-update.zip"
  function_name    = "${var.ENV}-api-product-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  timeout          = 20
  layers           = [aws_lambda_layer_version.sharp_lambda_layer.arn]
  environment {
    variables = {
      TABLE_PREFIX            = var.ENV
      DB_USERNAME             = var.DB_USERNAME
      DB_PASSWORD             = var.DB_PASSWORD
      PRODUCT_IMAGE_S3_BUCKET = var.PRODUCT_IMAGE_S3_BUCKET
    }
  }
}


resource "aws_lambda_function" "product-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-delete.zip"
  function_name    = "${var.ENV}-api-product-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

# cart-item lambda functions
resource "aws_lambda_function" "cart-item-find-by-user-id" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-cart-item-find-by-user-id.zip"
  function_name    = "${var.ENV}-api-cart-item-find-by-user-id"
  handler          = "find-by-user-id.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-cart-item-find-by-user-id.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "cart-item-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function,
    aws_lambda_layer_version.sharp_lambda_layer
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-cart-item-create.zip"
  function_name    = "${var.ENV}-api-cart-item-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-cart-item-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  timeout          = 20
  environment {
    variables = {
      TABLE_PREFIX            = var.ENV
      DB_USERNAME             = var.DB_USERNAME
      DB_PASSWORD             = var.DB_PASSWORD
      PRODUCT_IMAGE_S3_BUCKET = var.PRODUCT_IMAGE_S3_BUCKET
    }
  }
}

resource "aws_lambda_function" "cart-item-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function,
    aws_lambda_layer_version.sharp_lambda_layer
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-cart-item-update.zip"
  function_name    = "${var.ENV}-api-cart-item-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-cart-item-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  timeout          = 20
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}


resource "aws_lambda_function" "cart-item-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-cart-item-delete.zip"
  function_name    = "${var.ENV}-api-cart-item-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-cart-item-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

# reserved-product lambda functions

resource "aws_lambda_function" "reserved-product-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function,
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-reserved-product-create.zip"
  function_name    = "${var.ENV}-api-reserved-product-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-reserved-product-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  timeout          = 20
  environment {
    variables = {
      TABLE_PREFIX            = var.ENV
      DB_USERNAME             = var.DB_USERNAME
      DB_PASSWORD             = var.DB_PASSWORD
    }
  }
}

# product-attribute lambda functions
resource "aws_lambda_function" "product-attribute-find-all" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-attribute-find-all.zip"
  function_name    = "${var.ENV}-api-product-attribute-find-all"
  handler          = "find-all.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-attribute-find-all.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-attribute-find-one" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-attribute-find-one.zip"
  function_name    = "${var.ENV}-api-product-attribute-find-one"
  handler          = "find-one.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-attribute-find-one.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-attribute-create" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-attribute-create.zip"
  function_name    = "${var.ENV}-api-product-attribute-create"
  handler          = "create.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-attribute-create.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-attribute-update" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-attribute-update.zip"
  function_name    = "${var.ENV}-api-product-attribute-update"
  handler          = "update.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-attribute-update.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

resource "aws_lambda_function" "product-attribute-delete" {
  depends_on = [
    aws_s3_bucket_object.dcommerce-function
  ]
  s3_bucket        = data.aws_s3_bucket.dcommerce-functions.bucket
  s3_key           = "${var.ENV}-api-product-attribute-delete.zip"
  function_name    = "${var.ENV}-api-product-attribute-delete"
  handler          = "delete.handler"
  source_code_hash = base64sha256(filemd5("${path.module}/dist/packages/${var.ENV}-api-product-attribute-delete.zip"))
  role             = aws_iam_role.iam_for_api_lambda.arn
  runtime          = "nodejs16.x"
  environment {
    variables = {
      TABLE_PREFIX = var.ENV
      DB_USERNAME  = var.DB_USERNAME
      DB_PASSWORD  = var.DB_PASSWORD
    }
  }
}

