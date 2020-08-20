<template>
  <div class="mx-auto container">
    <p class="text-white text-4xl text-center font-bold">9 Aug 2020</p>

    <div class="flex items-center justify-between">
      <h1 class="text-white text-2xl text-center font-bold">Today's Credit</h1>
      <div class="w-16 h-16 bg-yellow-500 rounded shadow flex items-center justify-center">
        <span class="text-5xl text-white font-bold">5</span>
      </div>
    </div>
    <div class="h-100 overflow-auto mt-5 text-2xl">
      <div class="px-5 py-3 bg-gray-100 shadow rounded-lg flex items-center justify-between ">
        <p>Opening</p>
        <p class="text-5xl font-bold">0</p>
      </div>
      <div class="mt-3 px-5 py-3 bg-gray-100 shadow rounded-lg flex items-center justify-between ">
        <div>
          <p class="text-base text-gray-700 leading-none">8:00 a.m.</p>
          <p>Earn credit</p>
          <p class="text-lg text-orange-500 leading-none">for finishing homework on time</p>
        </div>
        <p class="text-5xl font-bold">+5</p>
      </div>
      <div class="mt-3 px-5 py-3 bg-gray-100 shadow rounded-lg flex items-center justify-between ">
        <p>Closing</p>
        <p class="text-5xl font-bold">5</p>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 mx-3 mb-3 mt-3">
      <div class="flex items-center justify-center">
        <button type="button" class="w-32 px-4 py-2 text-2xl bg-green-100 rounded-lg shadow-lg">
          Earn
        </button>
        <button type="button" class="w-32 mx-3 px-4 py-2 text-2xl bg-green-100 rounded-lg shadow-lg">
          Spend
        </button>
        <button type="button" class="w-32 px-4 py-2 text-2xl bg-green-100 rounded-lg shadow-lg">
          Deduct
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
