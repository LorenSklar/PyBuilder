<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	
	export let consoleOutput: string[] = [];
	
	let consoleElement: HTMLDivElement;
	
	// Auto-scroll to bottom when new output arrives
	afterUpdate(() => {
		if (consoleElement) {
			consoleElement.scrollTop = consoleElement.scrollHeight;
		}
	});
</script>

<div class="console">
	<div class="console-header">Python Console</div>
	<div class="console-output" bind:this={consoleElement}>
		{#if consoleOutput.length === 0}
			<span class="prompt">>>> </span>
		{:else}
			{#each consoleOutput as output, i}
				<div class="output-line">
					<span class="prompt">>>> </span>
					<span class="output">{output}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.console {
		height: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f8f9fa;
	}

	.console-header {
		padding: 0.5rem 1rem;
		background-color: #e9ecef;
		border-bottom: 1px solid #ccc;
		font-weight: 600;
		color: #495057;
		font-size: 14px;
	}

	.console-output {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		font-family: 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.4;
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

	/* Scrollbar styling */
	.console-output::-webkit-scrollbar {
		width: 8px;
	}

	.console-output::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.console-output::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 4px;
	}

	.console-output::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>
