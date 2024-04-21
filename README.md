# SPADES (Stock Prediction and Automated Dashboard for Economic Success)

https://github.com/CS5224Team29/SPADES

CS5224 group project

Team 29: Zuo Yue, Putri Darmawan, Luo Ming, Tian Wenle

SPADES is a cloud-native SaaS application designed for stock market analysis and prediction, providing users with advanced analytics and visualization tools.


### Deployment Overview
1. Frontend deployment: configure AWS Amplify to auto pulling the dev branch of this GitHub repo and deploy as a web app.<br>
1.1. Push frontend code on github<br>
1.2. Go to AWS Amplify, select "Amplify Hosting"<br>
1.3. Choose "Github" as source of "From your existing code"<br>
1.4. Select Repository and branch at "Add repository branch".<br>
1.5. Edit build settings as below:<br>
     ```
        version: 1
        frontend:
          phases:
            preBuild:
              commands:
                - cd frontend # Navigate into the React app directory
                - npm install
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: frontend/build  # Adjust according to your React app's build output directory
            files:
              - '**/*'
          cache:
            paths:
              - frontend/node_modules/**/* # Cache the node_modules in the React app directory
     ```
     
   1.6. Click "Save and Build", AWS will start to provision resource, build and deploy the application.<br>
   
2. FaaS: AWS lambda functions were created with the following steps:<br>
2.1. Upload required files to S3 (Dockerfile, requirements.txt, and python scripts)<br>
2.2. Build docker image with the files<br>
2.3. Push the docker image to Amazon ECR<br>
2.4. Create a lambda function using the docker image<br>
2.5. Enable the function URL after the lambda function is created<br>

3. Deploy AWS EC2 instance to host the prediction.py<br>
3.1. Create an instance, make sure it allows traffic from SSH and HTTP<br>
3.2. Set up environment according to requirements.txt, so that all required libraries (like yfinance, fastapi, tensorflow, sklearn) are ready<br>
3.3. Install nginx to setup the server<br>
3.4. Configure nginx with:<br>
        ```
        server {
                listen 80;
                server_name ec2_public_ip;
                location / {
                        proxy_pass http://127.0.0.1:8000;
                }
        }
        ```<br>
3.5. Run ```sudo service nginx restart```<br>
3.6. Start and keep prediction.py script to keep web server running to accept API requests by calling ```python3 -m uvicorn prediction:app```<br>
3.7. Change the frontend url to the EC2 public IP
