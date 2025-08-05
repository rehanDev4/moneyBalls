<template>
  <q-page > <div class="q-pa-md" >
    <q-list bordered separator>
      <q-item v-for="entery in enteries" :key="entery.id">
        <q-item-section
        class="text-weight-bold"
        :class="useAmountcolorClass(entery.amount)"
        >
          {{ entery.name }}
        </q-item-section>

        <q-item-section
        class="text-weight-bold"
        :class="useAmountcolorClass(entery.amount)"
        side
        >
          {{ usecurrencify(entery.amount) }}
        </q-item-section>
      </q-item>


    </q-list>
  </div>
  <q-footer>
    <div class="row q-pa-sm">
      <div class="col">
           <q-input dense bg-color="white"
 outlined  placeholder="Name" />
      </div>
      <div class="col">
         <q-input
         input-class="text-right"
         dense
         bg-color="white"
         outlined
         placeholder="Amount"
         type="number"
         step="0.01"
         />

      </div>
      <div class="col">B</div>

    </div>
  </q-footer>
  </q-page>
</template>

<script setup>
// import s
import { ref } from 'vue';
import { useAmountcolorClass }  from 'src/use/useAmountColor';
import { usecurrencify } from 'src/use/useCurrencify.js'; // Assuming you have a utility function for currency formatting

// enteries

const enteries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.99,
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999,
  },
  {
    id: 'id3',
    name: 'Phone Bill',
    amount: -14.99,
  },
  {
    id: 'id4',
    name: 'Outing',
    amount: -1000,
  },
  {
    id: 'id5',
    name: 'Food',
    amount: -450,
  },
  {
    id: 'id6',
    name: 'unknown',
    amount: 0,
  },
  {
    id: 'id7',
    name: 'unknown',
    amount: 0,
  },
]);


</script>
