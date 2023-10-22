import requests
from bs4 import BeautifulSoup

def scrape_google_shopping(keyword):
    if keyword is not None:  
        url = f'https://www.google.com/search?q={keyword}&tbm=shop'
        headers = {
            'User-Agent': '',
        }
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        product_name_element = soup.find('div', class_='rgHvZc')

        if product_name_element is not None:
            product_name = product_name_element.get_text()
        else:
            product_name = None

        price_element = soup.find('span', class_='HRLxBb')

        if price_element is not None:
            price = price_element.get_text()
        else:
            price = None

        image_element = soup.find('div', class_='oR27Gd')
        if image_element:
            image_url = image_element.find('img')['src']
        else:
            image_url = None

        return {
            "product_name": product_name,
            "price": price,
            "image_url": image_url
        }
    


