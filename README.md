# P4P (Passion for Parking) App 😍

P4P is a companion app created by Park Now employees for the [Tweakers development summit 2020 workshop](https://tweakers.net/partners/developerssummit2020/1094/parknow/) called "Zero to production with serverless in AWS"

## Overview

In this workshop, we are simulating that we are a new brand startup called P4P (Passion for Parking). The startup founders are convinced that they can bring value to the parking industry. They are passionate founders. However, as any startup, they have limited development resources. In their minds the first business iteration is clear:

- Create an Android and iOS app which the main feature is start and stop a parking transaction. 
- Create an API which can be integrated in Parking companies which can enforce the validation of the parking ticket.

But, how to build this product with lack of technical knowledge and small amount of financial resources? So, they decide to get the advise from an independent software development consultant, with the mission of picture them which is the quickest way to go to production with this first version of the system. 

## P4P Technical roadmap

After several meetings, the software development consultant present the following technical proposal:

- 📱 **App Front-end**: Build the apps with [React Native](https://facebook.github.io/react-native/). React Native is a framework for building native apps using React. In the current stage, the startup is not in the position to hire two developers who can maintain two different code bases (native Android and iOS code). In the area of hybrid development, React Native is the best technical choice. Those are the main reasons:

    - Performance is pretty close to native.
    - Since the app does not need heavy processing of images or data, hybrid development is good option.
    - React Native have access to native components, so the app can get the full benefit of all phone capabilities. 
    - Most part of the code base be shared between Android and iOS.
    - The UI experience between Android and iOS is not very different so is possible reuse most of layouts. 
    - The maintenance can be done by the same developer

- **Back-end system**: Use third party cloud provider services to create and manage the API. As it mentioned, the startup has limited resources and the founders does not want to spend all the capital buying on-premise servers, hire devops and backend developers. They prefer paid as they go, so in case the idea does not successed when is in the market, they only will lose the investment done in the app development and the cloud provider expenses. Moreover, the cloud provider allow them to scale and do not pay for the resources that they won't use. Under this conditions, the advise is use [Amazon Web Services](https://aws.amazon.com/) as main cloud provider. To facilitate to the frontend developer manage entirely the backend with the minimum interaction, the consultant advise use [AWS AppSync](https://aws.amazon.com/appsync/) (GraphQL API) and the client SDK [AWS Amplify](https://aws.amazon.com/es/amplify/). Using this services, the frontend developers can manage the backend infrastructures, intregate easily in the front-ends, monitor the activity and the stakeholders can make use of the reporting tools to analyze the costs.

The company hire the first mobile developer with cloud knowledge with the task of create the first shipable version of their product. 

## First version of the app (without backend) 🥳

After accept the technical roadmap the founders hire a freelance designer to build the design. Once the design is ready, the solo-frontend developer in the company set up a React Native project and he build the layout acording the design. In the first sprint demo the solo-frontend present the following app:

![First version of the app](assets/workshop_1.gif)

## Introduction to AWS Amplify

[AWS Amplify](https://aws.amazon.com/es/amplify/) framework is an opinionated client framework for building scalable mobile and web apps. For many companies, approach cloud technologies is not straigth forward, so Amplify facilitates this transition giving to the developers a full set of development tools to go from app development to backend deployment from your terminal. 

### Getting started with Amplify

1. If you do not have AWS account, sign up for an AWS Account. There no upfront charges or any term commitments to create an AWS account and signing up gives you immediate access to the AWS Free Tier.

2. Install the CLI:
   
    - Install **Node.js** and **npm** if they are not already on your machine. The version requirements are:
       * Node.js >= 8.x
       * npm >= 5.x
       You can check your current version using `node -v` and `npm -v`

       Resources to install node.js and npm on mac: https://blog.teamtreehouse.com/install-node-js-npm-mac
       and resources to install node.js and npm on windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows (first part)

    - Install Amplify CLI
      
      `npm install -g @aws-amplify/cli`

    - Run `amplify` or `amplify -v` to be sure the CLI was install successfully

    Now you are ready to conect AWS Amplify with yout AWS Account, so in the future the AWS Amplify client can create resources that you need in your project on your behalf.

3. Configure AWS Amplify through CLI

   - Go to your terminal and run `amplify configure`

   - The first thing the cli will ask you is to sign in your AWS Account console (https://console.aws.amazon.com/). Press `Enter` to go to the next step once you are ready.

   - Now the cli will ask you about specify the region where you will host your application. 
   
      > AWS has the concept of a **Region**, which is a physical location around the world where we cluster data centers. Each AWS Region consists of multiple, isolated, and physhically separate **Availability Zones** within a geographic area. Each Availability Zone has independent power, cooling, and physical security and is connected via redundant, ultra-low-latency networks.

   - Next, you need to specify the username of the new IAM user. After giving a new a name to our user, the CLI will open the AWS Console and will open the wizard to create a new IAM User. It's recommended only give programmatic access. In the next step the CLI will propose us give full administration access to our new user, which seems contraintiutive if AWS at the same time is recommending apply the "Lease privilege principle". Here https://github.com/aws-amplify/amplify-cli/issues/351 you can have more information, how the community is working in adding only the policy of the servicer you will need. For the sake of this exercise we will create the user with full admin access. Once you have created the user, do not close the window because you will need to indicate in the CLI the `access_key` and the `secret_key` of the created user.

        If you are not familiar with AWS IAM, you can visit this resource https://serverless-stack.com/chapters/what-is-iam.html , which give you an introduction and guidance how to create it manually

    - At the end of this process the CLI will ask you about the name for the profile file that the cli will create in your computer to easy access during the framework usage. It is recommended use meaninful name in case have different profile for different usages.

    Congratulations! 🤙 Your AWS Amplify is configure and ready to integrate in your application.

## Creating a Backend for the first iteration of P4P app. 

### Initialize your backend resources. 

We used Expo CLI to create our first React Native app. In the `master` branch you have an app the functionaly have a button to start a parking, a counter to know how long is taking the parking and an animation that represents the car in and out of the parking. This app is suitable to run in almost any device (you should do some responsive adjustments to make it run in large devices).

- Checkout the `master` with `git checkout master`.
- Navigate to the main code of the app `cd PassionForParking`.
- Execute `expo start` to start the app.

The next step for our developer is create a backend which can keep track of that parking action occur in our app. So, now we can initialize AWS Amplify client in our project.

- Execute `amplify init`. With this command we are making our project amplify project. So we will able to use all the available features.
- Run the default settings the command line offer us. The app that we are building and the backend we are building are going to production directly.
- We will select the AWS profile we created before.
- AWS Amplify will start the process to create resources in order to create in your behalf backend
resources, take a look about what Amplify created:

```
CREATE_IN_PROGRESS AuthRole                             AWS::IAM::Role             Wed Feb 12 2020 01:03:17 GMT+0100 (Central European Standard Time) Resource creation Initiated
CREATE_IN_PROGRESS DeploymentBucket                     AWS::S3::Bucket            Wed Feb 12 2020 01:03:17 GMT+0100 (Central European Standard Time) Resource creation Initiated
CREATE_IN_PROGRESS UnauthRole                           AWS::IAM::Role             Wed Feb 12 2020 01:03:16 GMT+0100 (Central European Standard Time) Resource creation Initiated
CREATE_IN_PROGRESS UnauthRole                           AWS::IAM::Role             Wed Feb 12 2020 01:03:16 GMT+0100 (Central European Standard Time)
CREATE_IN_PROGRESS AuthRole                             AWS::IAM::Role             Wed Feb 12 2020 01:03:16 GMT+0100 (Central European Standard Time)
CREATE_IN_PROGRESS DeploymentBucket                     AWS::S3::Bucket            Wed Feb 12 2020 01:03:16 GMT+0100 (Central European Standard Time)
CREATE_IN_PROGRESS amplify-passionforparking-prod-10311 AWS::CloudFormation::Stack Wed Feb 12 2020 01:03:13 GMT+0100 (Central European Standard Time) User Initiated
```

AWS Amplify created in your behalf a role which can be authorized to deploy backend resources. It creates a S3 bucket which will be use as build server to host all the backend object required during your new builds.

Now, let's create a GraphQL API:

### Create your API

> If you are not familiar with GraphQL, could be good start the following tutorial: https://graphql.org/learn/


- In the root of your project perform `amplify add api`. 
- Select `GraphQL` 
- For this example you will use the `API Key` to access your API. If you want to add authentication for our app we 
can use `Amazon Cognito User Pool` for the whole authentication circle.
- We are not going use `annotated schema`
- Choose `Yes` for the option `guided schema creation`. The CLI will ask for the name of our type. After this our code editor will be open. This will open the editor and we can type the following schema:

```
type Parking @model {
  id: ID!
  userID: Int
  licensePlate: String
  latitude: Float
  longitude: Float
  createdAt: String
  stoppedAt: String
  state: String
}
```

Because we are not authenticate users in this example, we simple hardcode userID, sames as locations. 

- Execute `amplify push`. AWS Amplify will start the process to create all the resources for the API, set up the different configuration files.
- During the `push` process the system will ask you if you want to generate the code automatically to integrate in your app.

### Underhood of an Amplify project

Let's take a look of the code generated by the Amplify client:

Inside of the `backend/api` we have some interesting files:
  
  * `schema.graphql`: Will give you an overview of the API GraphQL schema
  * Folder `awscloudformation/nested-cloudformation-stack`. AWS Amplify use AWS Cloudformation (Infrastructure as Code) to define the services AWS Amplify needs to deploy. So, from out frontend, we are deploying backend resources using Infrastructure as Code.
  * `amplify-meta.json` which gives us information of our infra. Who is the provider of out infra, in our case `cloudformation`, the api details. 

  * Inside of `src/graphql`, the client generate for us all the code related with the all the possible operations in our API. We have operative API, documented through schema definition!.

The small version P4P is ready to go to production from a command line tool and bit of frontend.

### Adding GraphQL API interactions.

In the previous step we created from our CLI a working API for our frontend. Let's change our code to be able to interact with out API and let's go through the different actions that we have availble.

#### Mutations

The first goal of our app is to provide the ability to start and stop parking actions. To allow that, our API created from our model a list of mutation operations. How do we know the list of operations available for the api? During the creation the backend we let the CLI generate the code for us. The generated code we will be able to find in `src/graphql` (if we did not change the default folder). 

Let's focus in the file `mutations.js`. We have availabe two operations `createParking` and `updateParking` which represent two mutations over the `ParkingAction` model available GraphQL API. You will need to do the following changes in your app in order to make use of thos mutations:

> If you explore more the generated code folder, you will release other files available. In queries.js you will have available the basic queries to your model which probably will be enough to use in your application. subscription.js will give you the real time updates operation. Subscriptions is a GraphQ feature available in many GraphQL server implementations which basically open a socket communication with the server allowing real time updates. 

Go to the following Gist: https://gist.github.com/tweakers-parknow-2020/35e23975e66c055b61f80f7bdd35c49f so you can copy the main modifications that we need to do to add the code necessary to interact with the API. Let's

The most important part of the changes are the two functions we create to operate against our API:

* Import all the required amplify libraries required.

```
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { createParking, updateParking } from './src/graphql/mutations';

// Configure your API
import config from './aws-exports'
```

* Initialize the GraphQL API object.

```
API.configure(config)
```

* Interact with the API using the generated code.

```
createParking = async () => {
    this.parkingAction = { ...initialParkingAction };
    this.parkingAction.createdAt = new Date().toLocaleString();
    const createParkingInput = {
      input: this.parkingAction
    };
    
    const newParking = await API.graphql(graphqlOperation(createParking, createParkingInput));
    this.parkingAction.id = newParking.data.createParking.id;
    
    // For debugging purposes. You will able to see the result 
    // of your operations
    console.log(JSON.stringify(newParking));
  };
```
```
stopParking = async () => {
    this.parkingAction.stoppedAt = new Date().toLocaleString();
    this.parkingAction.state = "STOP";
    const updateParkingInput = {
      input: this.parkingAction
    };
  
    const updatedParking = await API.graphql(graphqlOperation(updateParking, updateParkingInput));

    // For debugging purposes. You will able to see the result 
    // of your operations
    console.log(JSON.stringify(updatedParking));
  };
```

Interacting with the GraphQL from our generated code is simple. We use `await API.graphql(...);` to asynchronosly create a GraphQL request. We will pass a `graphqlOperation` method with two parameters: the string operation that represents the query we will like to perform. In out case is `createParking` and the input we will need pass to the query to be able to perform the operation. 

## P4P Phase 2 (2th part of the workshop)

Our company is making good money 💵. We are hiring new developers and we are really proud of what we achieved managing all our backend from the frontend. In the second part of the workshop we focused in explain the implications for a company that wants to scale and who this impact in the current setup. Those are common petfalls of using Amplify:

- All the stacks and resources created by Amplify are named on behalf of you. So, does not follow any specific pattern. If you scale the number of stacks (lambdas, dynamos and other services) will be really difficult to keep track of what stack belongs to which system. 

- If your team started to grow, it is common to have a team dedicated on infrastructure. This team probably would like to deploy and manage the stack separetly from the frontend. It's important to understand how with Amplify you can add existing API's (separation of concerns).

- Using Amplify, the security from the developer perspective can be very basic and does not follow practices like "lease privilege principle" for teams at scale.

- If you achieve this separation of concerns, you will be able to:

  - Create your infrastructure naming conventions.
  - Tagging resources.
  - Manage the security. 
  - Use the full power of IoC (Infrastructure as Code).
  - Monitoring.

In the project [PassionnForParking_CF](/PassionForParking_CF) which you can find in this repository, you have a sample how to do similar backend setup by defined directly in a `template.yaml` file which we define the resources we need and the interactions between them. 