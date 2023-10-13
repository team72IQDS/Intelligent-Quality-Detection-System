from ultralytics import YOLO

if __name__ == "__main__":
    model = YOLO("yolov8n.pt")
    results = model.train(data="../datasets/PLR.v6i.yolov8/data.yaml")
