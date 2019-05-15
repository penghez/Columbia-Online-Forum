import re
import requests
import time
from bs4 import BeautifulSoup
import pandas as pd
import boto3
from datetime import datetime as dt

def remove_non_utf8(text_list):
    return [text.encode('utf-8', errors='ignore').decode() for text in text_list]


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table= dynamodb.Table('columbia')

    scan = table.scan()
    with table.batch_writer() as batch:
        for each in scan['Items']:

            batch.delete_item(
                Key={
                'Title': each['Title']
                }
            )

    slots = event['currentIntent']['slots']
    t = slots['Title']
    title = t.replace(" ", "+")
    location = slots['Location']
    COLUMNS = ["Title", "Company", "Location", "Salary", "Summary", "Link"]
    # Needed for attaching to hrefs later
    INDEED_DOMAIN = 'https://www.indeed.com'
    # Example URL:
    BASE_URL = 'https://www.indeed.com/jobs?q=data+scientist&l=California'

    df = pd.DataFrame(columns=COLUMNS)

    # Stops columns like the link column from wrapping in the table that we print/save
    pd.set_option('display.max_colwidth', -1)
    pd.set_option('display.width', 1000)

    page_start = 0

    # while True:
    URL = BASE_URL + '&start=' + str(page_start)
    page = requests.get(URL)
    soup = BeautifulSoup(page.text, 'html.parser')

    job_cards = soup.find_all('div', class_='jobsearch-SerpJobCard')

    # print("Scraping page " + str(int(page_start / 10) + 1))

    for card in job_cards:
        title = card.find('a', {'data-tn-element': 'jobTitle'}).text.strip()

        # Several try/excepts used because indeed.com is not consistent with their HTML tag naming and placement
        try:
            company = card.find('span', class_='company').text.strip()
        except AttributeError:
            company = '-'

        try:
            location = card.find('div', class_='location').text
        except AttributeError:
            location = card.find('span', class_='location').text

        try:
            salary = card.find('div', class_='salarySnippet').text.strip()
        except AttributeError:
            salary = '-'

        try:
            summary = card.find('span', class_='summary').text.strip()
        except AttributeError:
            summary = card.find('div', class_='summary').text.strip()

        # Links converted from local hrefs to full URLs using domain
        link = INDEED_DOMAIN + card.find('a', class_='turnstileLink')['href']

        # Append row of values to dataframe
        df.loc[df.shape[0]] = remove_non_utf8([title, company, location, salary, summary, link])

        # If "Next" button is not visible, then there are no more pages to scrape
        # try:
        pagination = soup.find('div', class_='pagination').find('span', class_='np', text=re.compile(r'Next'))
        
        df.drop_duplicates(subset=["Title", "Company", "Location", "Salary"], inplace=True)
        print ("df", df)

#     count = 0
#     for index, row in df.iterrows():
#         if count > 10:
#             break
        
#         Title = row["Title"]
#         Company = row["Company"]
#         Location = row["Location"]
#         Salary = row["Salary"]
#         Summay = row["Summary"]
#         Link = row["Link"]
#         # timestamp = str(dt.now())
#         dynamo_data = {"Title" : Title, "Company" : Company, "Location" : Location,\
#                         "Salary" : Salary,"Summary" : Summay, "Link" : link}
#         dynamo_data_actual = {key : value for key, value in dynamo_data.items() if value}
#         response=table.put_item(Item = dynamo_data_actual)
#         count +=1
    
    return  {"dialogAction": {
    "type": "Close",
    "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "done"
            }
        }
    }
    
