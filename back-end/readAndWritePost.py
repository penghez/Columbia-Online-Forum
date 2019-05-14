import json
import boto3
import time

dynamodb = boto3.resource('dynamodb')
table_name = 'Forum-Post'


def lambda_handler(event, context):
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Origin,X-Requested-With,Authorization,Content-Type,Accept,Z-Key',
            'Content-Type': 'application/json'
        }
    }

    # Write to dynamoDB
    if event['httpMethod'] == 'POST':
        params = json.loads(event['body'])
        if 'comment' in event['resource']:
            dynamo_data = json.loads(read_from_dynamo(params['PostID']))
            comment_data = dynamo_data.get('Comment', [])
            params['Comment']['PostID'] = str(time.time())
            comment_data.append(params['Comment'])
            dynamo_data['Comment'] = comment_data
            response['body'] = write_to_dynamo(dynamo_data)
        else:
            dynamo_data = {}
            dynamo_data['PostID'] = str(time.time())
            dynamo_data['Title'] = params['Title']
            dynamo_data['Content'] = params['Content']
            dynamo_data['Author'] = params['Author']
            dynamo_data['Comment'] = []
            response['body'] = write_to_dynamo(dynamo_data)

    # Read from dynamoDB
    else:
        params = event['queryStringParameters']
        if 'all' in event['resource']:
            response['body'] = read_all_posts()
        else:
            postID = params['PostID']
            response['body'] = read_from_dynamo(postID)

    return response


def read_all_posts():
    table = dynamodb.Table(table_name)
    response = table.scan()['Items']
    response.sort(key=lambda r: r['PostID'], reverse=True)
    return json.dumps(response)


def read_from_dynamo(postID):
    table = dynamodb.Table(table_name)
    response = table.get_item(
        Key={
            'PostID': postID
        })
    return json.dumps(response['Item'])


def write_to_dynamo(data):
    table = dynamodb.Table(table_name)
    dynamo_data_actual = {key: value for key, value in data.items() if value}
    response = table.put_item(Item=dynamo_data_actual)
    return json.dumps({'PostID': data['PostID']})
