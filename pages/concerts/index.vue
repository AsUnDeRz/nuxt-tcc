<template>
  <div>
    <!-- <div class="flex justify-around">
      <button
        @click="refreshPage"
        class="h-10 px-6 font-semibold rounded-md bg-black text-white"
      >
        Refresh
      </button>
    </div> -->
    <NuxtLayout>
      <div
        class="flex justify-center items-center w-screen empty"
        v-show="concertIsEmpty"
      >
        <p>Concert empty</p>
      </div>

      <div
        class="flex justify-center items-center w-screen empty"
        v-show="loading"
      >
        <p>Loading</p>
      </div>

      <ListConcert
        v-for="(item, index) in state.concertList"
        :key="index"
        v-show="!concertIsEmpty"
        :model="item"
        @buy-now="buyNow"
      />
    </NuxtLayout>
  </div>
</template>

<script setup>
// definePageMeta({ layout: "header" });

const layout = ref("header");
const loading = ref(false);
const state = reactive({ concertList: [] });
const concertIsEmpty = computed(() => {
  return state.concertList.length == 0 ? true : false;
});

function refreshPage(event) {
  console.log("refreshPage");
  fetchData();
}

function buyNow(model) {
  navigateTo("/concerts/" + model.id);
}

watchEffect(fetchData);

async function fetchData() {
  try {
    const config = useRuntimeConfig();
    const { data, pending, error, refresh } = await useFetch(
      "/v2/products?distance=20&fields=id,name,description_short,venue,show_time,attributes,images,store,price,remain,sales_status,sales_url,soldout_status&group_date=&limit=10&order=show_start&page=1&q=&sort=desc&type=event",
      {
        method: "GET",
        headers: { "Accept-Language": "th" },
        baseURL: config.public.baseURL,
      }
    );
    if (data.value) {
      state.concertList = data.value.data.record;
    }

    if (error.value) {
    }

    loading.value = pending.value;
  } catch (error) {}
}
</script>

<style>
.empty {
  height: 200px;
  position: relative;
}
p.header {
  font-size: 48px;
}
</style>
