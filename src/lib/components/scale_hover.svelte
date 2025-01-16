<script lang="ts">
	let { children, class: klass = '' } = $props();
</script>

<div class={`transition hover:scale-110 hover:!opacity-100 group-hover/list:opacity-50 ${klass}`}>
	{@render children()}
</div>
