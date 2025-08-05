<template>
  <q-page > <div class="q-pa-md" >
    <q-list bordered separator>

 <q-slide-item
  v-for="entry in enteries"
  :key="entry.id"

 @right="onEnterySlideRight($event,entry)"
 left-color="positive"
 right-color="negative"
 >
        <!-- <template v-slot:left> <q-icon name="done" /></template> -->
        <template v-slot:right>
          <q-icon name="delete_sweep" />
        </template>

      <q-item>
        <q-item-section
        class="text-weight-bold"
        :class="useAmountcolorClass(entry.amount)"
        >
          {{ entry.name }}
        </q-item-section>

        <q-item-section
        class="text-weight-bold"
        :class="useAmountcolorClass(entry.amount)"
        side
        >
          {{ usecurrencify(entry.amount) }}
        </q-item-section>
      </q-item>
      </q-slide-item>


    </q-list>
  </div>
  <q-footer class="bg-transparent">
    <div class="row q-px-md q-py-sm q-nb-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">
        Balance:
      </div>
      <div
      :class="useAmountcolorClass(balance)"
      class="col  text-h6 text-right">
        {{ usecurrencify(balance) }}</div>

    </div>
    <q-form
    @submit="addEntery"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary ">
      <div class="col">
           <q-input
           v-model="addEnteryForm.name"
           dense bg-color="white"
           outlined
           ref="Nameref"
           placeholder="Name" />
      </div>
      <div class="col">
         <q-input
         v-model.number="addEnteryForm.amount"
         input-class="text-right"
         dense
         bg-color="white"
         outlined
         placeholder="Amount"
         type="number"
         step="0.01"
         />

      </div>
      <div class="col">
        <q-btn round type="submit" color="primary" icon="add" />
      </div>

    </q-form>
  </q-footer>
  </q-page>
</template>

<script setup>
// import's
import{ uid, useQuasar  } from 'quasar';
import { ref, computed, reactive } from 'vue';
import { useAmountcolorClass }  from 'src/use/useAmountColor';
import { usecurrencify } from 'src/use/useCurrencify.js'; // Assuming you have a utility function for currency formatting

// quasar dialog entery
const  $q = useQuasar()
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

]);
// balanced
const balance = computed(() => {
  let balance = 0;
  enteries.value.forEach(entry => {
    balance += entry.amount;
    });
    return balance.toFixed(2);
});


const addEnteryFormDefault = {
  name: '',
  amount: 0,
};
// add entery function

const Nameref = ref(null);
const addEnteryForm = reactive({
 ...addEnteryFormDefault
});

const addEnteryFormReset = () => {
Object.assign(addEnteryForm, addEnteryFormDefault);
Nameref.value.focus();
}

const addEntery = () => {
 const newEntery ={
  id :uid(),
  name: addEnteryForm.name,
  amount: parseFloat(addEnteryForm.amount),
 }
 enteries.value.push(newEntery);
 addEnteryFormReset();
}
// item slide right
const onEnterySlideRight = ({reset}, entry) => {
   $q.dialog({
        title: `Delete Entry`,
        message: `Delet this entry? <div class="q-nt-md text-weight-bold ${useAmountcolorClass(entry.amount)}"> ${ entry.name} : ${ usecurrencify(entry.amount)}</div>`,
        persistent: true,
        html: true,
        ok: {
          label: 'Delete',
          color: 'negative',
          push: true
        },
        cancel: {
          push: true,
          color: 'primary',
        },

      }).onOk(() => {
      deletEntry(entry.id);
      }).onCancel(() => {
       reset();
      })
}

// delet Entry method
const deletEntry = entryId => {
const index = enteries.value.findIndex(entry => entry.id === entryId);
enteries.value.splice(index, 1);
  $q.notify({
    message: 'Entry deleted successfully',
    position: 'top',
    color: 'negative',
  });
}
</script>
