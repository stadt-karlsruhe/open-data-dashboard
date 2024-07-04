# Continuous Delivery

The project employs Continuous Delivery (CD) practices, ensuring that code changes are automatically built, tested, and deployed to production environments.

## Application Deployment

For hosting the application, we use [Netlify](https://open-data-dashboard.netlify.app/en/home), a platform for automating web project deployments.
Netlify integrates directly with GitHub, enabling automatic deployments whenever changes are merged into the main branch.
Additionally, Netlify generates Preview URLs for every pull request, allowing viewing and testing the changes in a live environment before they are merged,
simplifying the review process and ensuring that new features meet the project's standards and requirements.

## Documentation Deployment

To ensure that the project's documentation is as accessible and up-to-date as the application itself, it is automatically deployed to [ReadTheDocs](https://open-data-dashboard.readthedocs.io/latest/).
This service monitors the repository for changes to the documentation and rebuilds the docs whenever updates are made.
This automation guarantees that the documentation reflects the latest state of the project.
