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

a. Upload required files to S3 (Dockerfile, requirements.txt, and python scripts)
b. Build docker image with the files
c. Push the docker image to Amazon ECR
d. Create a lambda function using the doker image
e. Enable the function URL after the lambda function is created

3. Deploy EC2 instance to host the prediction.py

3.1. Set up environment according to requirements.txt, so that all required libraries (like yfinance, fastapi, tensorflow, sklearn) are ready 

3.2. Start and keep prediction.py script to keep web server running to accept API requests

4. 
