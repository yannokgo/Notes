# CSS

## color animation

Create a nice rainbow animation effect

```html
<h1 id="eee">eee</h1>
```

```css
#eee {
    display: grid;
    place-items: center;
    color: blue;
    animation: hueAnim 3s linear infinite;
}

@keyframes hueAnim {
    100% {
        filter: hue-rotate(360deg);
    }
}
```