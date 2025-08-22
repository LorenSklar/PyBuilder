<svelte:head>
	<title>Python Curriculum</title>
	<meta name="description" content="Student-centered Python Learning Tool" />
</svelte:head>

<main>
	<PythonSandbox />
</main>

<script>
	import PythonSandbox from '$lib/components/PythonSandbox.svelte';
</script>

<style>
	main {
		height: 100vh;
		width: 100vw;
		margin: 0;
		padding: 0;
	}
</style>
