import json
import boto3
import time

dynamodb = boto3.resource('dynamodb')
table_name = 'Forum-User'


def lambda_handler(event, context):
    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Origin,X-Requested-With,Authorization,Content-Type,Accept,Z-Key',
            'Content-Type': 'application/json'
        }
    }
    print(event)
    new_user = event['request']['userAttributes']
    new_user['username'] = event['userName']
    response['body'] = write_to_dynamo(new_user)

    return event


def write_to_dynamo(data):
    table = dynamodb.Table(table_name)
    dynamo_data_actual = {key: value for key, value in data.items() if value}
    response = table.put_item(Item=dynamo_data_actual)
    return json.dumps({'username': data['username']})
