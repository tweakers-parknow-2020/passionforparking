# P4P (Passion for Parking) App

P4P is an application created by Park Now employees during the [Tweakers development summit 2020 workshop](https://tweakers.net/partners/developerssummit2020/1094/parknow/)

## Overview

During the workshop we are simulating that we are a new brand startup called P4P (Passion for Parking). The startup founders are convinced that they can bring value to the parking industry. They are passionate founders. However, as any startup, they have limited development resources. In their minds the first business iteration is clear:

- Create an Android and iOS app which the main feature is start and stop a parking transaction. 
- Create a web interface for operators, which can validate the parking actions made through the app.

Due to the lack of technical background of the stakeholders, they decide to get the advise from an independent software development consultant, with the mission of picture them which is the quickest way to put in the market this first version of the system. 

## P4P First Iteration

After several meetings, the software development consultant present the following technical proposal:

- **App Front-end**: Build the apps with [React Native](https://facebook.github.io/react-native/). React Native is a framework for building native apps using React. In the current stage, the startup is not in the position to hire one Android developer and one iOS developer that can maintain native development of the app. In the area of hybrid development, React Native is the best technical choice. Those are the main reasons:

    - Performance is pretty close to native.
    - Since the app does not need heavy processing of images or data, hybrid development is good option.
    - React Native have access to native components, so the app can get the full benefit of all phone capabilities. 
    - Most part of the code base be shared between Android and iOS.
    - The UI experience between Android and iOS is not very different so is possible reuse most of layouts. 
    - The maintenance can be done by the same developer

- **Web Front-end**: Build the web app with [React](https://github.com/facebook/react). Very well-known Javascript library. 

- **Back-end system**: Use third party cloud provider services to create and manage the API. As it mentioned, the startup has limited resources and the founders does not want to spend all the capital buying on-premise servers, hire devops and backend developers. They prefer paid as they use, so in case the idea does not successed when is in the market, they only will lose the investment done in the app development and the cloud provider expenses. Moreover, the cloud provider allow them to scale and do not paid for the resources that they do not use depending on the back-end workload (elasticity). Under this conditions, the advise is use [Amazon Web Services](https://aws.amazon.com/) as main cloud provider. To facilitate to the frontend developer manage entirely the backend with the minimum interaction, the consultant advise use [AWS AppSync](https://aws.amazon.com/appsync/) (GraphQL API) and the client SDK [AWS Amplify](https://aws.amazon.com/es/amplify/). Using this services, the frontend developers can manage the backend infrastructures, intregate easily in the front-ends, monitor the activity and the stakeholders can make use of the reporting tools to analyze the costs.

The company hire the first mobile developer with cloud knowledge with the task of create the first shipable version of their product. 

## Introduction to AWS Amplify

AWS Amplify framework is an opinionated client framework for building scalable mobile and web apps. AWS Amplify 


