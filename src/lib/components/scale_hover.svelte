<script lang="ts">
	let { children, class: klass = '' } = $props();
</script>

<div
	class={`transition lg:hover:scale-110 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 ${klass}`}
>
	{@render children()}
</div>
