# Neutralinojs CLI - Templates Plugin

Adds functionality to manage and reuse locally saved templates in Neutralinojs CLI, eliminating the need to repeatedly download or clone remote templates.

## Installation
This plugin extends the Neutralinojs CLI to allow local template management. Follow these steps to install:

### 1. Install Neutralino CLI

```
npm install -g @neutralinojs/neu
```
### 2. Add the Templates Plugin

```
neu plugins --add neutralinojs-templates
```
## Usage

### Save a template locally:

```
neu template save <templateName>
```

### List all saved templates:

```
neu template list
```

### Remove a locally saved template:

```
neu template remove <templateName>
```

### Create a project from a locally saved template:

```
neu create <projectName> --template <templateName>
```

or

```
neu create <projectName> -t <templateName>
```
