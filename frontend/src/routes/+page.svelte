<script>
	import { onMount } from 'svelte';
	import WhiteLabel from '$lib/components/white-label/index.svelte';
	import LaodingPage from '$lib/components/laoding-page.svelte';
	import MeuDominio from '$lib/components/meu-dominio/index.svelte';
	import NotFound from './not-found/+page.svelte';

	let domain = $state('');
	let loading = $state(true);
	let Page = $state();

	onMount(() => {
		domain = window.location.hostname;
		loading = false;

		switch (domain) {
			case 'whitelabel.com':
				Page = WhiteLabel;
				break;
			case 'meudominio.com':
				Page = MeuDominio;
				break;
			default:
				Page = NotFound;
				break;
		}
	});
</script>

{#if loading}
	<LaodingPage />
{:else}
	<Page />
{/if}
