<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-python';
	
	export let code = '';
	let textarea: HTMLTextAreaElement;
	let codeDisplay: HTMLPreElement;
	let lineNumbersContainer: HTMLDivElement;
	let timeoutId: number;

	// Debounced syntax highlighting
	function highlightCode() {
		if (timeoutId) clearTimeout(timeoutId);
		
		timeoutId = setTimeout(() => {
			if (codeDisplay && code.trim() !== '') {
				try {
					const highlighted = Prism.highlight(code, Prism.languages.python, 'python');
					codeDisplay.innerHTML = highlighted;
					updateLineNumbers();
				} catch (error) {
					console.error('Highlighting error:', error);
				}
			} else if (codeDisplay) {
				codeDisplay.innerHTML = '';
				updateLineNumbers();
			}
		}, 200);
	}

	// Update line numbers to match current code
	function updateLineNumbers() {
		if (lineNumbersContainer) {
			const lines = code.split('\n');
			const lineNumbers = lines.map((_, i) => `<span class="line-number">${i + 1}</span>`).join('\n');
			lineNumbersContainer.innerHTML = lineNumbers;
		}
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
	<div class="component-header">Python Editor</div>
	<div class="editor-content">
		<!-- Single editor container with integrated line numbers -->
		<div class="editor-container">
			<!-- Line numbers -->
			<div 
				bind:this={lineNumbersContainer}
				class="line-numbers"
				aria-hidden="true"
			></div>
			
			<!-- Textarea for input -->
			<textarea
				bind:this={textarea}
				bind:value={code}
				on:input={handleInput}
				placeholder="Enter your Python code here..."
				class="code-input"
				spellcheck="false"
			></textarea>
			
			<!-- Syntax highlighting overlay -->
			<pre 
				bind:this={codeDisplay}
				class="code-highlight"
				aria-hidden="true"
			></pre>
		</div>
	</div>
</div>

<style>
	.editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.component-header {
		padding: 0.5rem 1rem;
		background-color: #e9ecef;
		border-bottom: 1px solid #ccc;
		font-weight: 600;
		color: #495057;
		font-size: 18px;
	}

	.editor-content {
		flex: 1;
		position: relative;
	}

	.editor-container {
		position: relative;
		height: 100%;
		border: 1px solid #ccc;
		border-radius: 4px;
		overflow: hidden;
	}

	.line-numbers {
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		height: 100%;
		padding: 1rem 0.5rem;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		border-right: 2px solid #ccc;
		background-color: #f8f9fa;
		color: #999;
		box-sizing: border-box;
		z-index: 1;
		pointer-events: none;
	}

	.code-input {
		position: absolute;
		top: 0;
		left: 40px;
		width: calc(100% - 40px);
		height: 100%;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		padding: 1rem;
		margin: 0;
		border: none;
		background-color: transparent;
		color: #333; /* Visible text - no more transparency */
		resize: none;
		outline: none;
		box-sizing: border-box;
		caret-color: #333;
		z-index: 1; /* Below highlighting */
	}

	.code-highlight {
		position: absolute;
		top: 0;
		left: 40px;
		width: calc(100% - 40px);
		height: 100%;
		margin: 0;
		padding: 1rem;
		font-family: 'Courier New', monospace;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		border: none;
		background-color: transparent; /* Transparent background */
		color: transparent; /* Transparent text - only highlighting visible */
		box-sizing: border-box;
		overflow: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
		z-index: 2; /* Above textarea */
		pointer-events: none; /* Clicks go through to textarea */
	}

	:global(.line-number) {
		display: block;
		color: #999;
		text-align: right;
		padding-right: 0.5rem;
		user-select: none;
		font-weight: 600;
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
		font-weight: 600 !important;
	}

	:global(.code-highlight .token.string) {
		font-weight: 600 !important;
	}

	:global(.code-highlight .token.number) {
		font-weight: 600 !important;
	}
</style>
