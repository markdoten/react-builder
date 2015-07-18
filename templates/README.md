# nice
As simple as complicated can be.

Documentation: https://docs.google.com/document/d/1KqOAjJmPqoC8FvPu6K0yh9HWgRsTLvR-UDxQSHNsau8/edit


### Elastic Search
`brew install elasticsearch`

You might be required to install Java. It provides instructions on how to do so.

```
To have launchd start elasticsearch at login:
  ln -sfv /usr/local/opt/elasticsearch/*.plist ~/Library/LaunchAgents
Then to load elasticsearch now:
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.elasticsearch.plist
Or, if you don't want/need launchctl, you can just run:
  elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml
```

### MongoDB
`brew install mongodb`

```
To have launchd start elasticsearch at login:
  ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
To run:
  mongod
```

### Useful commands
Remove all tasks: `mongo nice --eval "db.tasks.remove({})"`
