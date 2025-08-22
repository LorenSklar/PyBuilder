<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	
	export let shellOutput: string[] = [];
	
	let shellElement: HTMLDivElement;
	
	// Auto-scroll to bottom when new output arrives
	afterUpdate(() => {
		if (shellElement) {
			shellElement.scrollTop = shellElement.scrollHeight;
		}
	});
</script>

<div class="shell">
	<div class="shell-header">Python Shell</div>
	<div class="shell-output" bind:this={shellElement}>
		{#if shellOutput.length === 0}
			<span class="prompt">>>> </span>
		{:else}
			{#each shellOutput as output, i}
				<div class="output-line">
					<span class="prompt">>>> </span>
					<span class="output">{output}</span>
				</div>
			{/each}
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

	.shell-header {
		padding: 0.5rem 1rem;
		background-color: #e9ecef;
		border-bottom: 1px solid #ccc;
		font-weight: 600;
		color: #495057;
		font-size: 14px;
	}

	.shell-output {
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
