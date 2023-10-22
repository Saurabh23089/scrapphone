from flask import Flask, request, jsonify
from urlrequest import scrape_google_shopping
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])

@app.route('/scrape', methods=['POST'])
def scrape_google_shopping_ad():
    request_data = request.get_json()
    keyword = request_data.get('keyword')
   
    if not keyword or not isinstance(keyword, str):
        return jsonify({"error": "Invalid or empty keyword"})

    product_info = scrape_google_shopping(keyword)
    return jsonify(product_info)

if __name__ == '__main__':
    app.run(debug=True)
