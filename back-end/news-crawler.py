# pip3 install newspaper3k
import newspaper
import nltk
nltk.download('punkt')
import boto3
import json
import time

s3 = boto3.resource('s3')
bucket_name = 'columbia-forum'
dynamodb = boto3.resource('dynamodb')
table_name = 'News-Feed'

urls = ['http://cnn.com', \
        'http://nytimes.com', \
        'https://www.theguardian.com/us']
orgs = ['CNN', 'NY-Times', 'the Guardian']

def read_from_news(orgs, urls):
    articles = []
    for url in urls:
        articles.append(newspaper.build(url).articles)

    for i in range(len(articles)):
        for art in articles[i]:
            art.download()
            art.parse()
    
            current_news = {}
            current_news['source'] = orgs[i]
            current_news['title'] = art.title
            current_news['id'] = hash(art.title)
            current_news['publish_time'] = art.publish_date
            current_news['authors'] = art.authors
            current_news['content'] = art.text
            current_news['path'] = orgs[i] + '/' + str(time.time()) + '.json'
            art.nlp()
            current_news['summary'] = art.summary
            
            print(current_news['title'])
            update_file(current_news['path'], current_news)
            dynamo_data = { 'NewsID': current_news['id'], \
                            'Source': current_news['source'], \
                            'PublishTime': current_news['publish_time'] }
            write_to_dynamo(dynamo_data)
            print("Updated to S3 and DynamoDB")


def update_file(path, content):
    encoded_json = content.encode("utf-8")
    response = s3.Bucket(bucket_name).put_object(Key=path, Body=encoded_json)
    return response


def write_to_dynamo(data):
    table = dynamodb.Table(table_name)
    dynamo_data_actual = {key : value for key, value in data.items() if value}
    response = table.put_item(Item=dynamo_data_actual)
    return response