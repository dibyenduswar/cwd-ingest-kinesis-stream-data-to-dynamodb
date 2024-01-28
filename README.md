# cwd-ingest-kinesis-stream-data-to-dynamodb
Ingest AWS Kinesis stream data into Dynamodb by triggering the Lambda function

Steps:

Create a Dynamodb Table -> Copy ARN
Create a Kinesis Data Stream -> Copy ARN
Create a Lambda Function -> 
	Give Permission to the Following Services for the Lambda:
      		CloudWatch
      		Dynamodb Table (Eg. Custom Policy with ARN)
      		Kinesis Data Stream (Eg. Custom Policy with ARN)
	Eg:

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"kinesis:UpdateStreamMode",
				"kinesis:ListStreams",
				"kinesis:EnableEnhancedMonitoring",
				"kinesis:UpdateShardCount",
				"kinesis:DescribeLimits",
				"kinesis:DisableEnhancedMonitoring"
			],
			"Resource": "*"
		},
		{
			"Sid": "VisualEditor1",
			"Effect": "Allow",
			"Action": "kinesis:*",
			"Resource": "arn:aws:kinesis:us-east-1:842551175243:stream/my-data-stream"
		},
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": "dynamodb:PutItem",
			"Resource": "arn:aws:dynamodb:us-east-1:842551175243:table/my-streaming-data"
		}
	]
}
```
  Deploy The Lambda Function
  Test the functionality using the AWS SDK client
    Eg: 
    
    ```
    aws kinesis put-record --stream-name my-data-stream --partition-key 124 --cli-binary-format raw-in-base64-out --data "HelloWorld!
    ```
    
  Now check the Dynamodb table. It should contain the 'HelloWorld' data.
