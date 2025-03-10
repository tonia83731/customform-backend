# CUSTOM FORM BACKEND (NODE.JS + MONGODB)

## Introduction

Since Google Forms could not meet specific requirements, this customized form platform was developed. It not only offers various question types but also allows users to design and fill out forms flexibly. More importantly, users can complete forms without needing a Google account. This platform aims to provide more options and help manage requirements more precisely.

The project is the backend API for custom forms, users are allowed to implement the actions below:

- Create, update and delete form data
- Add, update, and delete form sections and questions
- Manage responses by saving them to a database

- For API docs, please visit [customform-backend-docs](https://github.com/tonia83731/customform-backend-docs/tree/main)

- For Frontend information and demo, please visit [customform-frontend](https://github.com/tonia83731/customform-frontend)

## Current Question Type

- shortAnswer
- paragraph
- multiChoice
- dropdown
- checkboxes
- linearScale
- date
- multiChoiceGrid
- checkboxGrid

## Roles

- Full stack developer: Provide API based on the requirements and visualized the result by developing an app

## Tools

- express @4.21.1
- mongoose @8.9.6
- passport @0.7.0
- passport-jwt @4.0.1
- jsonwebtoken @9.0.2
- cors @2.8.5
- bcryptjs @2.4.3
- validator @13.12.0

## Further Development

- Add more customized options, include images, color selections, fonts, etc.
- Add more question type:
  - Consider Slider questions, drag/drop questions
  - Consider File upload questions
- Create Setting sections for each form:
  - Provide payment gateways (link or api)
  - Provide Email notifications when someone submit the response
  - Allowed user to set form visibility duration, e.g. the form is visible for 3 days and will automatically close afterward
- Data-driven Form Content: Visualize and output the data based on user responses
- Auto Save Form: Enable auto-saving so users can continue filling out the form from where they left off upon returning
