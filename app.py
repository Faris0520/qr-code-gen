from flask import Flask, render_template, request, jsonify
import qrcode
import base64
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.form['data']
    qr = qrcode.QRCode(version=1, box_size=8, border=1)  # Ubah box_size dan border
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    # Simpan gambar ke dalam memori
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({'url': f'data:image/png;base64,{img_str}'})

if __name__ == '__main__':
    app.run(debug=True)