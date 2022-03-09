# Hugo

## New project
```bash
hugo version

hugo new site quickstart #new site
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke #more themes: https://github.com/gohugoio/hugoThemes
```

## Set theme
```bash
echo theme = \"ananke\" >> config.toml
```

# Make a theme
```bash
hugo new posts/my-first-post.md
```

# Start the server
```bash
hugo server -D # with draft set to enabled
```

# Build static pages
```bash
hugo -D
```
Output will be in ./public/ directory by default (-d/--destination flag to change it, or set publishdir in the config file).