<template>
	<RouterView />
</template>

<style lang="scss">
* {
	box-sizing: border-box;
	z-index: 1;
}

html,
body,
#app {
	width: 100%;
	height: 100%;

	margin: 0;
	padding: 0;

	background-color: $color-background;
	color: $color-text;

	font-family: 'Fira Mono', monospace;
	font-size: medium;

	overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	padding: 0.5em 0px;
	font-weight: 700;
}

p {
	margin: 0;
	padding: 0.5em 0px;
}

a {
	color: $color-text;
}
</style>
