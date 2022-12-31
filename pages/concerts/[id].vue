<template>
  <div>
    <NuxtLayout name="header">
      <div class="flex justify-center items-center m-20">
        <img :src="image" alt="" loading="lazy" class="w-full" />
      </div>
      <div class="p-10" v-html="htmlContent"></div>

      <div class="bg-black absolute p-3 flex justify-between items-center">
        <p class="w-2/5">Price {{ mintText }}</p>

        <button class="buy_button w-4/5">Buy now</button>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const state = reactive({ data: {} });
const route = useRoute();
const concertId = route.params.id;
const image = ref("");
const mintText = ref("");
const htmlContent = ref("");

// definePageMeta({
//   validate: async (route) => {
//     const nuxtApp = useNuxtApp();
//     // Check if the id is made up of digits
//     return /^\d+$/.test(route.params.id);
//   },
// });

watchEffect(fetchData);

async function fetchData() {
  try {
    const config = useRuntimeConfig();
    const { data, pending, error, refresh } = await useFetch(
      "/v2/products/" +
        concertId +
        "?version=1.0.0&device=ios&display_status=true&fields=id%2Cname%2Cattributes%2Cimages%2Cstage%2Cvenue%28id%2Cname%2Clat%2Clong%29%2Cstore%28id%2Cname%2Cimage%29%2Csoldout_status%2Cremain%2Cgroup_type%2Cprice%28id%2Cmin%2Cmin_text%2Ccurrency_value%2Ccurrency_symbol%29%2Cshow_time%28id%2Cstatus%2Ctext_full%2Cstart%2Cend%29%2Cwebview_url%2Cviewed%2Csales_url%2Cshare_url%2Cvariants%2Cis_redeem%2Ctype%2Csurvey_status,description",
      {
        method: "GET",
        headers: { "Accept-Language": "th" },
        baseURL: config.public.baseURL,
      }
    );
    if (data.value) {
      console.log("hasData");
      console.log(data.value);
      state.data.value = data.value.data;
      image.value = data.value.data.images[0].url;
      mintText.value = data.value.data.price.min_text;
      htmlContent.value = data.value.data.description;
    }

    if (error.value) {
    }

    loading.value = pending.value;
  } catch (error) {}
}
</script>

<style scoped>
img {
  border-radius: 16px;
  box-shadow: 30px 30px 50px 5px #1a1515;
}
div.absolute {
  background-color: white;
  position: sticky;
  bottom: 0;
  height: 100px;
  box-shadow: 30px 30px 50px 5px #1a1515;
  border: 5px solid whitesmoke;
  border-top-left-radius: 3em;
  border-top-right-radius: 3em;
}
.container {
  height: 200px;
}
.buy_button {
  color: white;
  margin: 10px;
  background-color: red;
  height: 3em;
  border-radius: 3em;
}
p {
  text-align: center;
}
</style>
