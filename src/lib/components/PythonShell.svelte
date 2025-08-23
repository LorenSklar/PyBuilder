<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	
	// Define output line types to match PythonSandbox
	type OutputLine = 
		| { type: 'stdout'; content: string }
		| { type: 'traceback-header'; content: string }
		| { type: 'traceback-file'; content: string }
		| { type: 'traceback-code'; content: string }
		| { type: 'traceback-error'; content: string };
	
	export let shellOutput: OutputLine[] = [];
	
	let shellElement: HTMLDivElement;
	
	// Auto-scroll to bottom when new output arrives
	afterUpdate(() => {
		if (shellElement) {
			shellElement.scrollTop = shellElement.scrollHeight;
		}
	});
</script>

<div class="shell">
	<div class="component-header">Python Shell</div>
	<div class="shell-output" bind:this={shellElement}>
		{#if shellOutput.length === 0}
			<span class="prompt">>>> </span>
		{:else}
			{#each shellOutput as output, i}
				{#if output.type === 'stdout'}
					<div class="output-line">
						<span class="output">{output.content}</span>
					</div>
				{:else if output.type === 'traceback-header'}
					<div class="traceback-header">{output.content}</div>
				{:else if output.type === 'traceback-file'}
					<div class="traceback-file">{output.content}</div>
				{:else if output.type === 'traceback-code'}
					<div class="traceback-code">{output.content}</div>
				{:else if output.type === 'traceback-error'}
					<div class="traceback-error">{output.content}</div>
				{/if}
			{/each}
			<span class="prompt">>>> </span>
		{/if}
	</div>
</div>

<style>
	.shell {
		height: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f8f9fa;
	}

	.component-header {
		padding: 0.5rem 1rem;
		background-color: #e9ecef;
		border-bottom: 1px solid #ccc;
		font-weight: 600;
		color: #495057;
		font-size: 18px;
	}

	.shell-output {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		color: #333;
	}

	.prompt {
		color: #007acc;
		font-weight: bold;
	}

	.output-line {
		margin-bottom: 0.5rem;
	}

	.output {
		color: #333;
	}

	/* Traceback styling to match IDLE */
	.traceback-header {
		color: #d73a49;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.traceback-file {
		color: #d73a49;
		font-weight: 700;
		margin-left: 1rem;
		margin-bottom: 0.25rem;
	}

	.traceback-code {
		color: #d73a49;
		font-weight: 700;
		margin-left: 2rem;
		margin-bottom: 0.25rem;
	}

	.traceback-error {
		color: #d73a49;
		font-weight: 700;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
	}

	/* Scrollbar styling */
	.shell-output::-webkit-scrollbar {
		width: 8px;
	}

	.shell-output::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.shell-output::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 4px;
	}

	.shell-output::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>
