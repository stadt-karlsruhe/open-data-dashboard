# Open Data Dashboard

## Documentation

The documentation for the project can be found on [Read the Docs](https://open-data-dashboard.readthedocs.io/latest/).

## Deployment

The project is automatically deployed to GitHub Pages and Netlify on every push to the main branch. It is available at:

- [https://stadt-karlsruhe.github.io/open-data-dashboard/](https://stadt-karlsruhe.github.io/open-data-dashboard/)
- [https://open-data-dashboard.netlify.app/](https://open-data-dashboard.netlify.app/)

Additionally, a preview is available for all pull requests. The link can be found in the corresponding comments sections.

## Development

### Application

First, run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docs

Make sure you have [Python3.12](https://www.python.org/downloads/release/python-3123/) installed on your system.

First, set up your virtual environment and install the required dependencies:

**Linux:**

```bash
python -m venv docs/.venv
source docs/.venv/bin/activate
pip install -r docs/requirements.txt
```

**Windows:**

```bash
python -m venv docs/.venv
./docs/.venv/Scripts/activate.bat
pip install -r docs/requirements.txt
```

Now you can run the MkDocs development server:

```bash
npm run docs
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.
