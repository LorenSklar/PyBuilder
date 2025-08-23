<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import PythonEditor from './PythonEditor.svelte';
	import ExecuteButton from './ExecuteButton.svelte';
	import PythonShell from './PythonShell.svelte';
	import { config } from '$lib/config';

	let ws: WebSocket | null = null;
	let currentCode = '';
	
	// Define output line types
	type OutputLine = 
		| { type: 'stdout'; content: string }
		| { type: 'traceback-header'; content: string }
		| { type: 'traceback-file'; content: string }
		| { type: 'traceback-code'; content: string }
		| { type: 'traceback-error'; content: string };

	let shellOutput: OutputLine[] = [];

	// Parse Python traceback into structured lines
	function parseTraceback(content: string): OutputLine[] {
		const lines = content.split('\n');
		const result: OutputLine[] = [];
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;
			
			if (line.startsWith('Traceback (most recent call last):')) {
				result.push({ type: 'traceback-header', content: line });
			} else if (line.startsWith('File ') && line.includes('line') && line.includes('in <module>')) {
				// Extract just the line number and simplify
				const match = line.match(/line (\d+)/);
				if (match) {
					result.push({ type: 'traceback-file', content: `line ${match[1]} in <module>` });
				}
			} else if (line.startsWith('File ') && line.includes('line') && !line.includes('in <module>')) {
				// Other file references in the call stack
				const match = line.match(/line (\d+)/);
				if (match) {
					const functionMatch = line.match(/in (.+)/);
					const functionName = functionMatch ? functionMatch[1] : 'unknown function';
					result.push({ type: 'traceback-file', content: `line ${match[1]} in ${functionName}` });
				}
			} else if (i > 0 && lines[i-1].includes('line') && !line.startsWith('File') && !line.startsWith('Traceback')) {
				// This is the actual code line that caused the error
				result.push({ type: 'traceback-code', content: line });
			} else if (line.includes('Error:') || line.includes('Exception:') || line.includes('NameError') || 
					   line.includes('TypeError') || line.includes('ValueError') || line.includes('SyntaxError')) {
				result.push({ type: 'traceback-error', content: line });
			}
		}
		
		return result;
	}

	// Helper function for conditional logging
	function log(message: string, data?: any) {
		if (config.verbose) {
			console.log(message, data);
		}
	}

	function logError(message: string, error?: any) {
		// Always log errors, regardless of verbose mode
		console.error(message, error);
	}

	onMount(() => {
		// Initialize WebSocket connection
		log('🔌 Attempting WebSocket connection to:', config.websocket);
		ws = new WebSocket(config.websocket);
		
		ws.onopen = () => {
			log('✅ WebSocket connected successfully');
		};
		
		ws.onmessage = (event) => {
			log('📥 WebSocket message received:', event.data);
			try {
				const data = JSON.parse(event.data);
				log('📋 Parsed data:', data);
				
				// Show actual Python output and errors
				if (data.type === 'stdout') {
					shellOutput = [...shellOutput, { type: 'stdout', content: data.content }];
				} else if (data.type === 'stderr') {
					// Parse traceback for proper styling
					const tracebackLines = parseTraceback(data.content);
					shellOutput = [...shellOutput, ...tracebackLines];
				}
				// Don't display execution_start or execution_complete status messages
			} catch (error) {
				logError('❌ Failed to parse WebSocket message:', error);
				log('📄 Raw message:', event.data);
			}
		};
		
		ws.onerror = (error) => {
			logError('❌ WebSocket error:', error);
		};
		
		ws.onclose = (event) => {
			log(`🔌 WebSocket disconnected. Code: ${event.code}, Reason: ${event.reason}`);
		};
	});

	onDestroy(() => {
		if (ws) {
			log('🔌 Closing WebSocket connection');
			ws.close();
		}
	});

	function handleExecuteClick() {
		log('🔘 Execute button clicked, executing current code');
		if (currentCode) {
			executeCode(currentCode);
		} else {
			log('❌ No code to execute');
		}
	}

	function executeCode(code: string) {
		if (ws && ws.readyState === WebSocket.OPEN && code) {
			const message = { code };
			log('🚀 Sending code to WebSocket:', message);
			ws.send(JSON.stringify(message));
		} else {
			log('❌ Cannot execute code:', {
				wsExists: !!ws,
				readyState: ws?.readyState,
				hasCode: !!code
			});
		}
	}
</script>

<div class="sandbox">
	<div class="editor-section">
		<PythonEditor bind:code={currentCode} />
	</div>
	
	<div class="button-section">
		<ExecuteButton on:execute={handleExecuteClick} />
	</div>
	
	<div class="shell-section">
		<PythonShell {shellOutput} />
	</div>
</div>

<style>
	.sandbox {
		display: flex;
		height: 100vh;
		padding: 1rem;
		gap: 1rem;
	}

	.editor-section {
		flex: 1;
	}

	.button-section {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shell-section {
		flex: 1;
	}

	/* Mobile/Portrait layout */
	@media (max-width: 768px) {
		.sandbox {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		.button-section {
			justify-content: center;
		}
	}
</style>
