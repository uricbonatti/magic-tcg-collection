require('dotenv').config();
const scanner = require("sonarqube-scanner");

function genSonarProjectName(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return word.toUpperCase()
  }).replace(/[-_\s]+/g, '')
};


function run(){
  const sonarUrl = process.env.SONAR_URL;
  const sonarToken = process.env.SONAR_TOKEN;
  if (sonarToken && sonarUrl) {
    scanner(
      {
        serverUrl: process.env.SONAR_URL,
        token: process.env.SONAR_TOKEN,
        options: {
          "sonar.projectKey": `dev.uric:${process.env.npm_package_name}`,
          "sonar.projectName": genSonarProjectName(process.env.npm_package_name),
          "sonar.projectVersion": process.env.npm_package_version,
          "sonar.projectBaseDir": "./",
          "sonar.sources": "./src",
          "sonar.tests": "./tests",
          "sonar.language": "ts",
          "sonar.sourceEncoding": "UTF-8",
          "sonar.exclusions": [
            "./node_modules/**",
            'strykers.conf.js',
            'sonar.config.js',
            'src/config/*.ts',
            'src/utils/logger.ts',
            'src/shared/app/server.ts',
            'src/shared/telemetry/*.ts',
            'src/shared/utils/logger.ts',
            'src/shared/utils/MethodLogger.ts',
            'src/**/containers/*.ts',
            'src/**/entities/*.ts',
            'src/**/schemas/*.ts',
          ].join(','), 
          "sonar.typescript.lcov.reportPaths": "./coverage/lcov.info",
        },
      },
      () => process.exit()
    );
  }
}

run();
