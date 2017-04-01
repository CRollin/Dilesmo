import json
import urllib.request

with open("urls.json", 'r') as url_json:
    content = json.load(url_json)
for i, item in enumerate(content):
    url, path = item['url'], item['file_path']
    urllib.request.urlretrieve(url, path)
    print("Downloaded %i images out of %i" % (i, len(content)))
