# Create a Static Web App on Azure

This repository shows you how to build a Static Web App for Azure and how to add a Function in Azure for a serverless backend.  Please read [Create a Static Web App on Azure][blog] to see how it was created.

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Azure Account](https://azure.microsoft.com/en-us/)
> Azure Subscription
- [GitHub Account](https://www.github.com/)
- [Okta CLI](https://cli.okta.com)
> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.
- [Visual Studio Code]
> [Azure Fucntions VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
> [Azure Static Web Apps VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To pull this example, first create an empty github repo.  Next run the following commands:

```bash
git clone --bare https://github.com/nickolasfisher/okta-azure-static-web-app.git
cd okta-azure-static-web-app
git push --mirror {your git repo}
cd ..
rm -rf okta-azure-static-web-app.git
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```
If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 
Create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Application name: Azure-Static-App
- Type of Application: **2: SPA**
- Callback: `http://localhost:4280/login/callback`
- Post Logout Redirect URI: `http://localhost:4280`

The application configuration will be printed in the terminal.  Note your `issuer` and your `clientId`.

Replace all instances of {yourOktaIssuer} with the issuer from above.

Replace all instances of {yourClientId} with the clientId from above.  

### Deploy your application

In the Azure Static Web Apps Visual Studio Code extension, click on **Create Static Web App**.  Follow the prompts with the following values.

> Azure Web App name `azure-static-app`
> GitHub repo `azure-static-app`
> Commit Message `initial commit`
> Region - Select the region closested to you
> Framework - React
> root of your app `azure-static-app`
> root of your api `api`
> build - leave this blank

### Configure your Okta application with your new Azure Domain

In your Okta admin panle
Naviagte to *Security -> API*
Click on **Trusted Origins**
Add your Azure domain to this list

Navigate to your Okta application
Click **Edit** and add {yourAzureDomain}/login/callback to the *Sign-in Redirect URIs* and {yourAzureDomain} to *Sign-out redirect URIs*
Click **Save**

## Links

This example uses the following open source libraries from Okta:

* [Okta with NodeJs](https://developer.okta.com/code/nodejs/)
* [Okta with React](https://developer.okta.com/code/react/)
* [Okta JWT Verifier](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/xyz
