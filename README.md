# How to Build and Deploy a Serverless React App on Azure Example

This repository shows you how to build a Static Web App in React for Azure and how to add a Function in Azure for a serverless backend.  Please read [How to Build and Deploy a Serverless React App on Azure][blog] to see how it was created.

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Azure Account](https://azure.microsoft.com/en-us/)
  - Azure Subscription to use for the Azure Account
- [GitHub Account](https://www.github.com/)
- [Okta CLI](https://cli.okta.com)
> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.
- [Visual Studio Code](https://code.visualstudio.com/)
  - [Azure Fucntions VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
  - [Azure Static Web Apps VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To pull this example, first create an empty GitHub repo.  Next run the following commands:

```bash
git clone --bare https://github.com/oktadev/okta-react-azure-functions-example.git
cd okta-react-azure-functions-example
git push --mirror {your git repo}
cd ..
rm -rf okta-react-azure-functions-example.git
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

Replace the instances of {yourOktaDomain} with the issuer domain from above in `azure-static-app/src/AppWithRouterAccess.jsx` and `api/CreateBadge/index.js`.

Replace the instance of {yourClientId} with the clientId from above in `azure-static-app/src/AppWithRouterAccess.jsx`.  

### Deploy your application

In the Azure Static Web Apps Visual Studio Code extension, click on **Create Static Web App**.  Follow the prompts with the following values.

> Azure Web App name `azure-static-app`
> GitHub repo `azure-static-app`
> Commit Message `initial commit`
> Region - Select the region closest to you
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

[blog]: https://developer.okta.com/blog/2022/04/13/react-azure-functions
