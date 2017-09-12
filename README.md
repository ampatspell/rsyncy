# Rsyncy.app

Rsyncy is OSX app which synces locally changed files to some remote location. It is done by watching with `watchdog` and `rsync`.

![Navigation bar](https://raw.githubusercontent.com/ampatspell/rsyncy/master/doc/images/navbar.png)
![Rsyncy.app](https://raw.githubusercontent.com/ampatspell/rsyncy/master/doc/images/index.png)
![Project](https://raw.githubusercontent.com/ampatspell/rsyncy/master/doc/images/project.png)
![Project edit](https://raw.githubusercontent.com/ampatspell/rsyncy/master/doc/images/edit.png)

## Why?

I have an old MacBook Air and I'm working on rather large Ember.js projects for which builds takes up to 25 seconds. That's not productive.
But I also don't want to buy a new latop. So I wrote this. Now I'm editing locally but running `ember s` and `docker-compose` on some random virtual server.

## Install

```
$ brew update
$ brew install watchman
$ brew install rsync
```

And download latest Rsyncy.app from [GitHub releases](https://github.com/ampatspell/rsyncy/releases)

## Configuration

Rsyncy projects are added in groups. Add a group, then add a project.

If you turn on "Watch file changes", `watchdog` is run for this project, otherwise you'll have to manually press sync button to sync the folder.
