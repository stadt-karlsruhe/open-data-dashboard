# Development

## Development Environment

It is highly recommended to use [Visual Studio Code](https://code.visualstudio.com/) for working on the `Open Data Dashboard`.
The project contains useful preset VSCode settings that will be applied once you open the project. Additionally, make sure to install the recommended extension.

## Application

To start developing the `Open Data Dashboard` [Next.js](https://nextjs.org/) application,
make sure you have [Node.js](https://nodejs.org/en/download/current) installed on your system.

Now, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Useful commands:**

```bash title="Run Next.js development server"
npm run dev
```

```bash title="Lint code (ESLint)"
npm run lint
```

```bash title="Execute tests"
npm test
```

```bash title="Validate configuration files"
npm run test:config-validation
```

```bash title="Build application"
npm run build
```

```bash title="Run production build locally"
npm run start
```

**Resources:**

- [Next.js Documentation](https://nextjs.org/docs)

## Documentation

To start developing the `Open Data Dashboard` [MkDocs](https://www.mkdocs.org/) documentation,
make sure you have [Python3.12](https://www.python.org/downloads/release/python-3123/) installed on your system.

First, set up your virtual environment and install the required dependencies:

```bash title="Setup and installation (Linux)"
python -m venv docs/.venv
source docs/.venv/bin/activate
pip install -r docs/requirements.txt
```

```bash title="Setup and installation (Windows)"
python -m venv docs/.venv
./docs/.venv/Scripts/activate.bat
pip install -r docs/requirements.txt
```

Now, you can run the MkDocs development server:

```bash
npm run docs
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

**Useful commands:**

```bash title="Start the live-reloading docs server"
npm run docs
```

```bash title="Build the documentation site"
mkdocs build
```

**Resources:**

- [MkDocs User Guide](https://www.mkdocs.org/user-guide/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/)
