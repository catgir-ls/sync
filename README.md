<div align="center">
    <h1><img src="https://i.imgur.com/eId0hE3.png" width="300px"><br />sync</h1>
    <p>A lightweight microservice to sync all existing mailbox users with new domains</p>
</div>

> ### Setup ✨
### Cloning the git repository
```
$ git clone https://github.com/catgir-ls/sync.git
$ cd sync
```
### Configuring
```
$ mv config.example.toml config.toml
$ vim config.toml
```
### Running 
```
$ deno run -A main.ts # Alternatively, you can run as a system service
```
> ### Contributing ✨
#### If you'd like to contribute, feel free to open a PR