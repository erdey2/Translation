from flask import Flask, request, jsonify, render_template
import csv
import os

app = Flask(__name__)
csv_file = 'words.csv'

# home page
@app.route('/')
def index():
    return render_template('index.html')


# Check if word exists
@app.route('/check-word', methods=['GET'])
def check_word():
    word = request.args.get('word')
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row and row[0] == word:
                return jsonify({"exists": True})
    return jsonify({"exists": False})

# Save word and sentence to CSV
@app.route('/save-word', methods=['POST'])
def save_word():
    data = request.get_json()
    word = data.get('word')
    sentence = data.get('sentence')
    
    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([word, sentence])
    return jsonify({"success": True})

if __name__ == '__main__':
    # Create CSV file if it doesn't exist
    if not os.path.exists(csv_file):
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Word", "Sentence"])
    app.run(debug=True)
