# Lufthansa Visual Test Cases

This repository contains visual test cases for the Lufthansa website.

## Execute using Github Actions

### 1) Setps to generate Percy token

To generate Percy tonken, follow the below steps

1. Log in to https://percy.io
2. Create a new project for your web application, here we have created a project named [visual-testing-lufthansa](https://percy.io/b389248f/visual-testing-lufthansa)
3. Provide a project name and click the "Create Project" button
4. Upon creating the project, you will find the PERCY_TOKEN within the project settings, here you can find it [here](https://percy.io/b389248f/visual-testing-lufthansa/settings)
   ![image](https://drive.google.com/uc?export=view&id=1xUduAq2kgY0shPhVmrjQNLMIvgGIY2Gu)

### 2) Setup the Repository secrets

To run Lufthansa tests using GitHub Actions, follow these steps to set up the required repository

1. Navigate to the settings of your Lufthansa repository.
2. Select "Secrets and variables" from the side menu.
3. In the "Secrets" section, click on "New repository secret".
   ![img](https://drive.google.com/uc?export=view&id=1-YnQ0eSh5Zp9D_k433MZGL2-xVIyBxDN)
4. Add the secret name as PERCY_TOKEN.
   ![img](https://drive.google.com/uc?export=view&id=1ENtPK6SDT1KGlfsf_3JsR_2F11n9QThV)
5. Paste your Percy token in the provided field.
6. Click on "Add secret" to save the token.

### 3) Test Execution

To execute Lufthansa tests using GitHub Actions, follow these steps:

1. Go to the "Actions" tab of your Lufthansa repository
2. Click on "Workflow" from the side menu
3. Click on Run workflow dropdown button
4. Select the branch you want to execute (e.g., "master")
5. Click on the "Run workflow" button
   ![img](https://drive.google.com/uc?export=view&id=19aBtCKrFQ2RdXYgkV0Mj_DfmdJ2iT1pu)
6. Once pipeline is executed successfully it will give green checkmark, and you can also see the reports inside of it
   ![img](https://drive.google.com/uc?export=view&id=1EdXZghzCwiqUM4zgqP3wnGLwJMlc5PS5)
   ![img](https://drive.google.com/uc?export=view&id=10VnZL-_tHrrIMkZQzJR3sYU3H-Eau4lP)

## Run Lufthansa Test Locally

### 1) Local Setup

- Node.js version 14 or higher
- npm version 8 or higher
- Clone this project repository to your local machine
- Open a terminal and navigate to the project directory

### 2) Environment variables:

#### Set explicitly
----
1) **Windows**
Run the following command to set the Percy token: 
`set PERCY_TOKEN=your-percy-token`

2) **macOS and Linux**
Run the following command:
`export PERCY_TOKEN=your-percy-token`


#### Without setting it explicitly
----
- We have set up a .env.example file with environment variable `PERCY_TOKEN` left blank.
- Your next step is to create an .env file and populate it with the actual values.
- We have installed the `dotenv` library which will automatically initialise the variable with set value.

### 3) Installation and Test Execution

1. To install the necessary dependencies, run the following commands in your terminal,
   `npm i`
2. Run the following command to execute the visual tests
   `npx percy exec -- npm run test`

## Test Report Generation

After executing the tests, You can find the report under the **test-results/** folder.
![image](https://drive.google.com/uc?export=view&id=1QREajc0KUpUEzoyoe9uLMhL_HHFuf4Gm)

And HTML report would look like this
![image](https://drive.google.com/uc?export=view&id=13uMBpTHyGZQBzZaDN0jhpqhgd2Bfw60c)
