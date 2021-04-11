# README

## Debug

If you use VSCode, try below code to debug your project:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno: Debug Current File",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": [
        "run",
        "--inspect-brk=127.0.0.1:9229",
        "--allow-all",
        "${relativeFile}",
      ],
      "attachSimplePort": 9229,
      "outputCapture": "std",
      "stopOnEntry": true,
    },
    {
      "name": "Deno: Debug Entrypoint",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": [
        "run",
        "--inspect-brk=127.0.0.1:9229",
        "--allow-all",
        "${workspaceFolder}/sources/main.ts",
      ],
      "attachSimplePort": 9229,
      "outputCapture": "std",
      "stopOnEntry": true,
    },
  ],
}
```

## Main

Entrypoint is `sources/main.ts`.
