<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-python';
	
	export let code = '';
	let textarea: HTMLTextAreaElement;
	let codeDisplay: HTMLPreElement;
	let timeoutId: number;

	// Debounced syntax highlighting
	function highlightCode() {
		if (timeoutId) clearTimeout(timeoutId);
		
		timeoutId = setTimeout(() => {
			if (codeDisplay && code.trim() !== '') {
				try {
					const highlighted = Prism.highlight(code, Prism.languages.python, 'python');
					codeDisplay.innerHTML = highlighted;
				} catch (error) {
					console.error('Highlighting error:', error);
				}
			} else if (codeDisplay) {
				codeDisplay.innerHTML = '';
			}
		}, 200);
	}

	// Auto-resize textarea to fit content
	function autoResize() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}

	// Handle input changes
	function handleInput() {
		autoResize();
		highlightCode();
	}

	// Watch for code changes from parent
	$: if (code) {
		highlightCode();
	}

	onMount(() => {
		// Initial highlighting
		highlightCode();
	});
</script>

<div class="editor">
	<div class="editor-header">Python Editor</div>
	<div class="editor-content">
		<!-- Hidden textarea for actual input -->
		<textarea
			bind:this={textarea}
			bind:value={code}
			on:input={handleInput}
			placeholder="Enter your Python code here..."
			class="code-input"
			spellcheck="false"
		></textarea>
		
		<!-- Visible pre element for highlighted code -->
		<pre 
			bind:this={codeDisplay}
			class="code-highlight"
			aria-hidden="true"
		></pre>
	</div>
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

	.editor-content {
		flex: 1;
		position: relative;
	}

	.code-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		padding: 1rem;
		margin: 0;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: transparent;
		color: transparent;
		resize: none;
		outline: none;
		box-sizing: border-box;
		caret-color: #333;
		z-index: 2;
	}

	.code-highlight {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 1rem;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f8f9fa;
		color: #333;
		box-sizing: border-box;
		overflow: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
		z-index: 1;
		pointer-events: none;
	}

	.code-input:focus {
		border-color: #007acc;
		box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
	}

	.code-input:focus + .code-highlight {
		border-color: #007acc;
		box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
	}

	.code-input::placeholder {
		color: #999;
		font-style: italic;
	}

	/* Override Prism token styles to match IDLE appearance */
	:global(.code-highlight .token) {
		font-size: 18px !important;
		font-weight: 600 !important;
		line-height: 1.6 !important;
	}

	:global(.code-highlight .token.keyword) {
		font-weight: 700 !important;
	}

	:global(.code-highlight .token.string) {
		font-weight: 600 !important;
	}

	:global(.code-highlight .token.number) {
		font-weight: 600 !important;
	}
</style>
