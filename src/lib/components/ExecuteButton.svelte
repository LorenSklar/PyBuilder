<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher<{ execute: void }>();
	
	function handleClick() {
		dispatch('execute');
	}
</script>

<button class="execute-btn" on:click={handleClick}>
	▶ Run
</button>

<style>
	.execute-btn {
		padding: 0.75rem 1.5rem;
		font-size: 16px;
		font-weight: 600;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s ease;
		white-space: nowrap;
	}

	.execute-btn:hover {
		background-color: #218838;
	}

	.execute-btn:active {
		background-color: #1e7e34;
	}

	.execute-btn:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3);
	}
</style>
