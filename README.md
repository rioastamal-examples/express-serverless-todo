## About

This repository contains simple serverless todo app. Serverless allows you to run application without thinking or managing servers.

Backend is written using Express.js and Frontend is written using vue.js.

The backend is built using AWS Lambda and Amazon API Gateway. For the database it uses Amazon DynamoDB, a NoSQL Key-Value database. For hosting the frontend it uses AWS Amplify.

To deploy the app we utilise Serverless Framework as Infrastructe as Code (IaC).

## Requirements

The app has been tested using following softwares or services.

- AWS CLI v2.82
- Serverless Framework v3.22
- Node.js v16
- GitHub account

## How to Deploy

It is recommended to fork this repo to your account.

```sh
git clone git@github.com:rioastamal-examples/express-serverless-todo.git
```

```sh
cd express-serverless-todo
```

Install dependencies for the backend.

```sh
cd api/
```

```sh
sh build.sh --build
```

Serverless Framework uses the same configuration as AWS CLI such as `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`. So make sure to setup those first.

In addition to AWS CLI config, you need to provide GitHub Personal Access Token via environment variable.

```sh
export GITHUB_PERSONAL_TOKEN=_YOUR_OWN_GITHUB_PERSONAL_TOKEN_
```

Then you can start to deploy.

```sh
sh build.sh --deploy
```

Command above will provision all AWS resources needed to run the app including backend and frontend.

## How to Run

After first deployment you need to go to AWS Amplify Console and do following:

1. Click the frontend app in this case **serverless-todo-frontend-development**
2. If you see **Migrate to our GitHub App** dialog just click **Start migration**
3. To begin first build click **Run build**

Next time if you want to deploy the frontend you just need to push commit to GitHub and AWS Amplify automatically trigger the build.

URL of Application can be found at the main page or on Domain settings page. Example of the URL.

```
https://BRANCH_NAME.RANDOM_VALUE.amplifyapp.com
```

## Clean Up

Remember to remove the application if you don't need it to prevent recurring cost.

Make sure you're on `api/` directory.

```sh
cd api/
```

Run following Serverless Framework command to destroy all resources created from the deployment.

```sh
serverless remove
```

## Author

This application is written by Rio Astamal.

## License

This project is licensed under MIT. See LICENSE.md for details.