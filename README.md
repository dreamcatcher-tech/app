# The Dreamcatcher App

Deployment is done by updating the version to deploy in [`deploy.yml`](.github/workflows/deploy.yml) and pushing to github, which triggers the action to publish.

The page is loaded with repository secrets for some temporary API keys that are needed to run.

The deployed package is: https://github.com/dreamcatcher-tech/dreamcatcher-stack/tree/master/pkg/dreamcatcher