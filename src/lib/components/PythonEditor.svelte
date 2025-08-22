<script lang="ts">
	export let code = '';
	let textarea: HTMLTextAreaElement;
	
	// Auto-resize textarea to fit content
	function autoResize() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}
</script>

<div class="editor">
	<div class="editor-header">Python Editor</div>
	<textarea
		bind:this={textarea}
		bind:value={code}
		on:input={autoResize}
		placeholder="Enter your Python code here..."
		class="code-input"
		spellcheck="false"
	></textarea>
</div>

<style>
	.editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.editor-header {
		padding: 0.5rem 1rem;
		background-color: #e9ecef;
		border-bottom: 1px solid #ccc;
		font-weight: 600;
		color: #495057;
		font-size: 14px;
	}

	.code-input {
		flex: 1;
		font-family: 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.4;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f8f9fa;
		color: #333;
		resize: none;
		outline: none;
		box-sizing: border-box;
	}

	.code-input:focus {
		border-color: #007acc;
		box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
	}

	.code-input::placeholder {
		color: #999;
		font-style: italic;
	}
</style>
