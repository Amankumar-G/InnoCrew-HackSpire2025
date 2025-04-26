from fastapi import FastAPI, WebSocket
from app.predict import predict
import base64

app = FastAPI()

@app.websocket("/ws/predict/")
async def websocket_predict(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive bytes (image) from client
            image_bytes = await websocket.receive_bytes()
            
            # Predict the gesture
            output = predict(image_bytes)
            
            # Send prediction back to client
            await websocket.send_json(output)
    except Exception as e:
        await websocket.close()
        print(f"WebSocket connection closed: {e}")
