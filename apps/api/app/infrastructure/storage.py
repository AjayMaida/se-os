import boto3
from app.config import settings
import uuid
import os
from typing import Optional

class StorageClient:
    def __init__(self):
        if settings.S3_ENDPOINT_URL:
            self.s3 = boto3.client(
                's3',
                endpoint_url=settings.S3_ENDPOINT_URL,
                aws_access_key_id=settings.S3_ACCESS_KEY,
                aws_secret_access_key=settings.S3_SECRET_KEY
            )
            self.bucket = settings.S3_BUCKET_NAME
        else:
            self.s3 = None
            
    def upload_file(self, file_content: bytes, filename: str, content_type: str) -> str:
        if not self.s3:
            return f"mock_url/{filename}"
            
        key = f"{uuid.uuid4()}-{filename}"
        self.s3.put_object(
            Bucket=self.bucket,
            Key=key,
            Body=file_content,
            ContentType=content_type
        )
        return self.get_file_url(key)
        
    def get_file_url(self, key: str) -> str:
        if not self.s3:
            return f"mock_url/{key}"
        return f"{settings.S3_ENDPOINT_URL}/{self.bucket}/{key}"
        
    def delete_file(self, key: str):
        if not self.s3:
            return
        self.s3.delete_object(Bucket=self.bucket, Key=key)

storage_client = StorageClient()
