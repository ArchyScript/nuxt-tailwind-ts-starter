<template>
    <div class="rounded-md flex ">  
        <input
            v-for="(digit, index) in pincode" 
            :key="index"  
            :value="digit"
            @input="validatePincodeChange(index, $event)"
            :placeholder="placeholder"
            :maxlength="1"
            class="!w-16 !h-16 text-center text-sm p-3 border-[3px] border-r-0 border-primary-500 "
            :class="`${index == 0 && 'rounded-l-md'} ${index == length - 1 && 'rounded-r-md  border-r-[3px]'}`"
        /> 
            <!-- ref="pincodeInputs"
            @focus="onInputFocus(index)" -->
    </div>
</template>

<script setup lang="ts"> 
const props = defineProps({
  length: {
    type: Number,
    default: 6,
  },
  placeholder: {
    type: String,
    default: '-',
  },
  isOnlyNumeric: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["pincode"]); 

const pincode = ref(Array(props.length).fill(''));
// const pincodeInputs = ref([]);
 
const isPincodeValid = (pincode: any) => {
  for (const digit of pincode) {
    // Return false if any field is empty
    if (!digit) return false;
    // Return false if any field is not a digit
    if (!/^[0-9]$/.test(digit)) return false; 
  }

  // Return true if all fields are valid
  return true; 
};

const validatePincodeChange = (index: any, event: any) => {  
    const digit = event.target.value; 
    if (!/^[0-9]$/.test(digit))  event.target.value = '';   
    pincode.value[index] = event.target.value    
    onGetPincode()
};
 
const onGetPincode = () => {   
  if (!isPincodeValid(pincode.value)) return   
    const fullPincode = pincode.value.join(''); 
    emit('pincode', fullPincode); 
};

//  onMounted(() => {
//   // Set focus to the first field when the component is mounted
// //   pincodeInputs.value[0].focus();
// });
</script>