AGE_GROUP = ["0 - 5", "6 - 11", "12 - 17", "18 - 23", "24 - 29", "30 - 35", "36 - 41", "42 - 47", "48 - 53", "54 - 59", "60 - 65", ">=66"] 
MODEL_PATH = "./age_estimate_v203_30e_c5.keras"
CASCADE_PATH = "./haarcascade_frontalface_default.xml"

import tensorflow as tf
import numpy as np

from PIL import Image
import base64
import io
import numpy as np
import cv2
from flask import Flask, request



app = Flask(__name__)

face_cascade = cv2.CascadeClassifier()
face_cascade.load(CASCADE_PATH)


def prediction(img):
    img = cv2.resize(img, (64, 64))
    img = img / 255.0
    model = tf.keras.saving.load_model(MODEL_PATH)
    return AGE_GROUP[model.predict(img[np.newaxis]).argmax()]

def extractFace(img):
    img_gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    img_gray = cv2.equalizeHist(img_gray)
    faces = face_cascade.detectMultiScale(img_gray, minNeighbors=10, minSize=(60, 60))
    if len(faces) == 0:
        return False
    result = {
        "age": [],
        "faces": faces
    }
    for (x, y, w, h) in faces:
        roi = img[y:y+h, x:x+w]
        result["age"].append(prediction(roi))
        img = cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 5)
        img = cv2.putText(img, result["age"][-1], (x + int(w/2), y), cv2.FONT_HERSHEY_SIMPLEX, 2 , (0, 0, 255), 5)
    return result, img

@app.route("/", methods=["POST"])
def Home():
    # try:
        base64_str = request.get_json()["base64_str"]
        size_device = request.get_json()["size_device"]
        #https://stackoverflow.com/questions/57318892/convert-base64-encoded-image-to-a-numpy-array
        base64_decoded = base64.b64decode(base64_str)
        image = Image.open(io.BytesIO(base64_decoded))
        image = np.array(image)
        image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        cv2.imwrite("test.jpg", img=image_bgr)
        ext = extractFace(image)
        if ext == False:
            ValueError()
        result, img = ext
        img = cv2.resize(img, (int(size_device[0]), int(size_device[1])))
        img = Image.fromarray(img)


        # Tạo một đối tượng bytes
        buffer = io.BytesIO()

        # Lưu hình ảnh vào buffer
        img.save(buffer, format='PNG')

        # Lấy giá trị byte và mã hóa thành base64
        img_base64 = base64.b64encode(buffer.getvalue()).decode()

        message = {
            "status": 200,
            "msg": "Successfully",
            "data": {
                "age": result["age"],
                "img": img_base64
            },
        }
        return message
    # except:
    #     return {
    #         "status": 500,
    #         "msg": "Something error just happened",
    #         "data": "",
    #     }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)