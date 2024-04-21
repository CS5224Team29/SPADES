# SPADES (Stock Prediction and Automated Dashboard for Economic Success)

https://github.com/CS5224Team29/SPADES

CS5224 group project

Team 29: Zuo Yue, Putri Darmawan, Luo Ming, Tian Wenle

SPADES is a cloud-native SaaS application designed for stock market analysis and prediction, providing users with advanced analytics and visualization tools.

### Files Description 
frontend/: frontend files to be auto deployed using AWS Amplify
prediction.py: Module for stock price prediction using machine learning models.
???


### Deployment Overview
1. Frontend deployment: configure AWS Amplify to auto pulling this GitHub repo and deploy as a web app.

2. FaaS: AWS lambda functions were created for the following functions:

a. Upload required files to S3 (Dockerfile, requirements.txt, and python scripts)<br>
b. Build docker image with the files<br>
c. Push the docker image to Amazon ECR<br>
d. Create a lambda function using the docker image<br>
e. Enable the function URL after the lambda function is created<br>

3. Deploy EC2 instance to host the prediction.py

3.1. Set up environment according to requirements.txt, so that all required libraries (like yfinance, fastapi, tensorflow, sklearn) are ready <br>
3.2. Install nginx to setup the server<br>
3.3. Configure nginx with<br>
```
server {
        listen 80;
        server_name ec2_public_ip;
        location / {
                proxy_pass http://127.0.0.1:8000;
        }
}
```
3.4. Run ```sudo service nginx restart```<br>
3.5. Start and keep prediction.py script to keep web server running to accept API requests by calling ```python3 -m uvicorn prediction:app```<br>

4. 
