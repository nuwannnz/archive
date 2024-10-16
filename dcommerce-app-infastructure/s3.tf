# defined the S3 bucket for product image uploads
resource "aws_s3_bucket" "dev-dcommerce-product-images" {
  bucket = "dev-dcommerce-product-images"
}

# define ACL for the S3 bucket 
resource "aws_s3_bucket_acl" "dev-product-images-acl" {
  bucket = aws_s3_bucket.dev-dcommerce-product-images.bucket
  acl    = "public-read"
}