# Continuous Integration

## GitHub Actions

For Continuous Integration (CI), the project leverages GitHub Actions,
ensuring that all code commits are automatically built, tested, and linted. This process helps in identifying and fixing issues early,
maintaining code quality, and streamlining the development workflow.
GitHub Actions triggers workflows on every push or pull request to the main branch,
running the entire suite of unit and component tests along with linting checks to enforce coding standards.

To set up the CI pipeline, the`.github/workflows` directory contains YAML configuration files that define the necessary pipeline steps.

## Testing and Code Coverage

Within the pipeline, the tests described in [Testing](testing.md) are executed.
For unit and component tests, the test coverage provided by Jest is uploaded to [Codecov](https://about.codecov.io/).
This way, a consistently high test coverage can be kept up (86% currently).

## Linting

In addition, the code is statically linted to ensure a good code quality and consistent formatting. The following tools are used:

* [ESLint](https://eslint.org/) for TypeScript and React (tsx) code
* [Markdownlint](https://github.com/DavidAnson/markdownlint) for Markdown
* [yamllint](https://github.com/adrienverge/yamllint) for YAML

## Lighthouse

To further improve the following of best practices in regards to performance, accessibility, SEO, and more,
[Lighthouse](https://github.com/GoogleChrome/lighthouse) is used.
