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

    if event['httpMethod'] == 'GET':
        params = event['queryStringParameters']
        username = params['username']
        response['body'] = read_from_dynamo(username)
    else:
        params = json.loads(event['body'])
        # params = event['body']
        user_current_data = json.loads(read_from_dynamo(params['username']))
        fill_user_info(params, user_current_data)
        print(user_current_data)
        write_to_dynamo(user_current_data)

    return response


def read_from_dynamo(username):
    table = dynamodb.Table(table_name)
    response = table.get_item(
        Key={
            'username': username
        })
    return json.dumps(response['Item'])


def write_to_dynamo(data):
    table = dynamodb.Table(table_name)
    dynamo_data_actual = {key: value for key, value in data.items() if value}
    response = table.put_item(Item=dynamo_data_actual)
    return json.dumps({'username': data['username']})


def fill_user_info(new_data, old_data):
    attr = ['school', 'grade', 'fieldOfStudy', 'bio', 'hobbies', 'friends']
    print(new_data)
    for a in attr:
        if a in new_data.keys():
            if (a == 'hobbies' and new_data[a] != '') or a == 'friends':
                if not a in old_data.keys():
                    old_data[a] = []
                if a == 'hobbies':
                    hobbies = new_data[a].split(',')
                    old_data[a] = hobbies
                else:
                    old_data[a].append(new_data[a])
            else:
                old_data[a] = new_data[a]
