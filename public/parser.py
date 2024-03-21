import csv
import os  
import json  

# Important notes
# Need to specify the holders csv name in the filename
# Airdrop amount is static for now, make sure to set it correctly

os.chdir(os.path.dirname(os.path.abspath(__file__)))

def parse_csv(filename):
    values = []
    with open(filename, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Check if the address starts with '0x'
            if row['address'].startswith('0x'):
                # Remove ' from quantity and convert it to an integer, this happened because of excel encoding and formatting
                quantity = float(row['quantity'].replace("'", ''))
                if quantity > 15000000000:
                    values.append([row['address'], airdropAmount])  # Set the arbitrary value on airdropAmount variable
    return values

filename = 'holders.csv'
airdropAmount = '100000000000000000000'
values = parse_csv(filename)

# Save values array to a JSON file
json_filename = 'values.json'
with open(json_filename, 'w') as json_file:
    json.dump(values, json_file)

print(f"Values array saved to {json_filename}")