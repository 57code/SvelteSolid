<script>
  let count = 0

  // what?
  $: console.log(count)

  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
