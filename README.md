# DeepL Slack Translator

An app that automatically translates languages sent to specific chat rooms in Slack using the DeepL API.

## Overview

DeepL Slack Translator was developed to facilitate multilingual communication on Slack. Even if it's difficult to understand foreign languages, this application allows real-time translation. Developed using TypeScript and Vitest, it offers a smooth and efficient development process.

## Setup

To run the project locally, follow these steps:

```bash
git clone git@github.com:ryo-kozin/DeepL-Slack-Translator.git
cd DeepL-Slack-Translator
npm install
npm run dev

# To run tests
npm test

# To build for production
npm run build
```

## Usage

Download this application and deploy it on your server. Obtain your Slack and DeepL API information and set it in the .env file. Once configured, run the application to start translating Slack messages automatically.

## Contribution

Contributions to this project are welcome. We look forward to various forms of contributions such as bug reports, feature suggestions, and pull requests. Please notify us through Issues before contributing to discuss your suggestions or changes.

## License

This project is published under the MIT License.

## Author

ryo-kozin

## Maintenance

This project is currently actively maintained. For the latest information and updates, please check the GitHub repository.

## Acknowledgments

Special thanks to the DeepL API for supporting multilingual communication and to Slack for being an excellent communication tool. Also, a big thank you to all the contributors who have contributed to the development of this project.

### Future Improvements

- Docker Integration: Although Docker has been incorporated, the application is currently being run directly in a local environment. The plan is to switch to running the application using Docker in the future.
- Test Improvements: Some tests are not functioning at the moment. These tests will be corrected to ensure all functionalities are properly tested.
- Logger Configuration: The logger system configuration will be revised for more effective log management.
