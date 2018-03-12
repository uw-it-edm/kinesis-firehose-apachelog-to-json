# Kinesis Firehose Apache Log to JSON Processor

Simple Node processor that converts Apache logs in combined log format
(with a few extra fields tacked onto the end) into JSON so they can be
sent to Elasticsearch. Also, uses GeoIP-lite to add location, and useragent
to parse the user agent string. 

### Acknowledgements

Many thanks to Hieu Le, whose post 
[Log analysis with Kinesis – Lambda – ElasticSearch – Kibana pipeline](https://www.hieule.info/data-science/log-analysis-with-kinesis-lambda-elasticsearch-kibana-pipeline)
was the starting point for this code, although I ran into a Webpack issue
with the node-grok library in AWS Lambda that led me to switch back
to a fairly permissive regex.

### Getting started

Before you begin, you will need to create a resources.yml file
at the top-level directory of this project. This is just a simple YAML
file that includes the log groups, log streams, and S3 buckets that you
want to allow the deployed AWS Lambda function to access.

    logGroups:
      - "*"    
    logStreams:
      - "*"    
    s3Buckets:
      - "arn:aws:s3:::some-bucket/*"

Then you'll need to install [Yarn](https://yarnpkg.com/en/) 
and the [Serverless Framework](https://serverless.com/framework/docs/getting-started#choose-your-compute-provider)
and then run the following command:

> yarn install  
> sls deploy --stage=dev  

This will deploy an AWS Lambda function into the US West 2 region. You 
will then need to include the ARN for that AWS Lambda in your
Kinesis Firehose configuration by enabling data transformation
and pointing it at the Lambda function. 

      
